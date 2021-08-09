import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { Connection, ILike, QueryRunner, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { FindAllUsuarioDto } from './dto/find-all-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
        private connection: Connection,
    ) {}

    async create(usuarioAutenticado: IUsuarioAutenticado, createUsuarioDto: CreateUsuarioDto) {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const usuario = await this.createUsuario(usuarioAutenticado, createUsuarioDto, queryRunner);

            await queryRunner.commitTransaction();

            return { id: usuario.id, uid: usuario.uid };
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

    async findAll(query: FindAllUsuarioDto) {
        const page = +query.page;
        const take = query.limit ? +query.limit : 20;
        const deletedo = query.deletedo === 'true';
        const uid = query.uid ?? null;

        const skip = take * (page - 1);

        const result = await this.usuarioRepo.findAndCount({
            select: ['id', 'uid'],
            where: {
                ...(uid ? { uid: ILike(`%${String(uid).replace(/ /g, '%')}%`) } : undefined),
                cancelado: deletedo,
            },
            take,
            skip,
            order: {
                uid: 'ASC',
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
        const usuario = await this.usuarioRepo.findOne({
            where: {
                id,
                cancelado: false,
            },
        });

        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }

        return { id: usuario.id, uid: usuario.uid };
    }

    async createUsuario(usuarioAutenticado: IUsuarioAutenticado, createUsuarioDto: CreateUsuarioDto, queryRunner?: QueryRunner) {
        const { uid } = createUsuarioDto;

        let usuario = await queryRunner.manager.findOne(Usuario, {
            where: {
                uid,
                cancelado: false,
            },
        });

        if (!usuario) {
            usuario = this.usuarioRepo.create({
                uid,
                alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
            });

            usuario = await queryRunner.manager.save(usuario);
        }

        return usuario;
    }
}
