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

        const existente = await this.aplicativoRepo.find({
            withDeleted: false,
            where: { nome },
        });

        if (existente.length > 0) {
            throw new BadRequestException(`Nome de Aplicativo(${nome}) já cadastrado`);
        }

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
        const nome = query.nome ?? null;

        const skip = take * (page - 1);

        let whereFind = {};
        if (nome) {
            whereFind = { ...whereFind, nome: ILike(`%${String(nome).replace(/ /g, '%')}%`) };
        }

        const result = await this.aplicativoRepo.findAndCount({
            select: ['id', 'nome', 'credencialFirebase'],
            withDeleted: false,
            where: whereFind,
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

    async findOne(id: string) {
        const aplicativo = await this.aplicativoRepo.findOne({
            select: ['id', 'nome', 'credencialFirebase'],
            withDeleted: false,
            where: {
                id,
            },
        });

        if (!aplicativo) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        return aplicativo;
    }

    async update(usuarioAutenticado: IUsuarioAutenticado, id: string, updateAplicativoDto: UpdateAplicativoDto) {
        const { nome, credencialFirebase } = updateAplicativoDto;

        const aplicativo = await this.aplicativoRepo.findOne(id, {
            withDeleted: false,
        });

        if (!aplicativo) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        await this.aplicativoRepo.update(id, {
            nome,
            credencialFirebase,
            alteradoPorTipo: usuarioAutenticado.tipoMatricula,
            alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
        });

        return { id, nome, credencialFirebase };
    }

    async remove(usuarioAutenticado: IUsuarioAutenticado, id: string) {
        const aplicativo = await this.aplicativoRepo.findOne(id, {
            withDeleted: false,
        });

        if (!aplicativo) {
            throw new BadRequestException('Aplicativo não encontrado.');
        }

        await this.aplicativoRepo.update(id, {
            canceladoEm: new Date(),
            alteradoPorTipo: usuarioAutenticado.tipoMatricula,
            alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
        });

        return 'Aplicativo removido com sucesso';
    }
}
