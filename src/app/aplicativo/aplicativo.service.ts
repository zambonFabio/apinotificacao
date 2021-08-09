import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { Connection, ILike, Repository } from 'typeorm';
import { CreateAplicativoDto } from './dto/create-aplicativo.dto';
import { FindAllAplicativoDto } from './dto/find-all-aplicativo.dto';
import { UpdateAplicativoDto } from './dto/update-aplicativo.dto';
import { Aplicativo } from './entities/aplicativo.entity';

@Injectable()
export class AplicativoService {
    constructor(
        @InjectRepository(Aplicativo)
        private aplicativoRepo: Repository<Aplicativo>,
        private connection: Connection,
    ) {}

    async create(usuarioAutenticado: IUsuarioAutenticado, createAplicativoDto: CreateAplicativoDto) {
        const { nome, credencialFirebase } = createAplicativoDto;

        let aplicativo = this.aplicativoRepo.create({
            alteradoPorTipo: usuarioAutenticado.tipoMatricula,
            alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
            nome,
            credencialFirebase,
        });

        aplicativo = await this.aplicativoRepo.save(aplicativo);

        return { id: aplicativo.id, nome: aplicativo.nome, credencialFirebase: aplicativo.credencialFirebase };
    }

    async findAll(query: FindAllAplicativoDto) {
        const page = +query.page;
        const take = query.limit ? +query.limit : 20;
        const deletedo = query.deletedo === 'true';
        const nome = query.nome ?? null;

        const skip = take * (page - 1);

        const result = await this.aplicativoRepo.findAndCount({
            select: ['id', 'nome', 'credencialFirebase'],
            where: {
                ...(nome ? { nome: ILike(`%${String(nome).replace(/ /g, '%')}%`) } : undefined),
                cancelado: deletedo,
            },
            take,
            skip,
            order: {
                nome: 'ASC',
            },
        });

        return {
            result: result[0],
            total: result[1],
            page,
            limit: take,
        };
    }

    async findOne(id: number) {
        const aplicativo = await this.aplicativoRepo.findOne({
            where: {
                id,
                cancelado: false,
            },
        });

        if (!aplicativo) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        return { id: aplicativo.id, nome: aplicativo.nome, credencialFirebase: aplicativo.credencialFirebase };
    }

    async update(usuarioAutenticado: IUsuarioAutenticado, id: number, updateAplicativoDto: UpdateAplicativoDto) {
        const { nome, credencialFirebase } = updateAplicativoDto;

        const aplicativoAlterado = await this.aplicativoRepo.update(
            { id, cancelado: false },
            {
                nome,
                credencialFirebase,
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                alteradoEm: new Date(),
            },
        );

        if (aplicativoAlterado.raw == 0) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        const aplicativo = await this.findOne(id);

        return { id: aplicativo.id, nome: aplicativo.nome, credencialFirebase: aplicativo.credencialFirebase };
    }

    async remove(usuarioAutenticado: IUsuarioAutenticado, id: number) {
        const aplicativo = await this.aplicativoRepo.update(
            { id, cancelado: false },
            {
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                alteradoEm: new Date(),
                cancelado: true,
            },
        );

        if (aplicativo.raw == 0) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        return { message: 'Aplicativo removido com sucesso' };
    }
}
