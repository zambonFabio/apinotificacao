import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { Connection, ILike, Repository } from 'typeorm';
import { AplicativoAssuntoService } from '../aplicativo-assunto/aplicativo-assunto.service';
import { CreateAssuntoDto } from './dto/create-assunto.dto';
import { FindAllAssuntoDto } from './dto/find-all-assunto.dto';
import { UpdateAssuntoDto } from './dto/update-assunto.dto';
import { Assunto } from './entities/assunto.entity';

@Injectable()
export class AssuntoService {
    constructor(
        @InjectRepository(Assunto)
        private assuntoRepo: Repository<Assunto>,
        private connection: Connection,
        private readonly aplicativoAssuntoService: AplicativoAssuntoService,
    ) {}

    async create(usuarioAutenticado: IUsuarioAutenticado, createAssuntoDto: CreateAssuntoDto) {
        const { descricao, opcional, aplicativos } = createAssuntoDto;

        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            let assunto = this.assuntoRepo.create({
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                descricao,
                opcional,
            });

            assunto = await queryRunner.manager.save(assunto);

            await this.aplicativoAssuntoService.aplicativoAssuntoPorAssunto(usuarioAutenticado, assunto.id, aplicativos, queryRunner);

            await queryRunner.commitTransaction();

            return { id: assunto.id, descricao: assunto.descricao, opcional: assunto.opcional };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            if (error?.status) {
                throw error;
            }
            throw new InternalServerErrorException('');
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(query: FindAllAssuntoDto) {
        const page = +query.page;
        const take = query.limit ? +query.limit : 20;
        const deletedo = query.deletedo === 'true';
        const descricao = query.descricao ?? null;
        const opcional = query.opcional ?? null;

        const skip = take * (page - 1);

        const result = await this.assuntoRepo.findAndCount({
            select: ['id', 'descricao', 'opcional'],
            where: {
                ...(descricao ? { descricao: ILike(`%${String(descricao).replace(/ /g, '%')}%`) } : undefined),
                ...(opcional ? { opcional: opcional } : undefined),
                cancelado: deletedo,
            },
            take,
            skip,
            order: {
                descricao: 'ASC',
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
        const assunto = await this.assuntoRepo.findOne({
            where: {
                id,
                cancelado: false,
            },
        });

        if (!assunto) {
            throw new BadRequestException('Assunto não encontrado.');
        }

        return { id: assunto.id, descricao: assunto.descricao, opcional: assunto.opcional };
    }

    async update(usuarioAutenticado: IUsuarioAutenticado, id: number, updateAssuntoDto: UpdateAssuntoDto) {
        const { descricao, opcional, aplicativos } = updateAssuntoDto;

        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const assuntoAlterado = await queryRunner.manager.update(Assunto, id, {
                descricao,
                opcional,
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                alteradoEm: new Date(),
            });

            if (assuntoAlterado.raw == 0) {
                throw new BadRequestException('Assunto não encontrado.');
            }

            await this.aplicativoAssuntoService.aplicativoAssuntoPorAssunto(usuarioAutenticado, id, aplicativos, queryRunner);

            await queryRunner.commitTransaction();

            return { id, descricao, opcional };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            if (error?.status) {
                throw error;
            }
            throw new InternalServerErrorException('');
        } finally {
            await queryRunner.release();
        }
    }

    async remove(usuarioAutenticado: IUsuarioAutenticado, id: number) {
        const assunto = await this.assuntoRepo.update(
            { id, cancelado: false },
            {
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                alteradoEm: new Date(),
                cancelado: true,
            },
        );

        if (assunto.raw == 0) {
            throw new BadRequestException('Assunto não encontrado.');
        }

        return { message: 'Assunto removido com sucesso' };
    }
}
