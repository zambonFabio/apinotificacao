import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { Connection, ILike, Not, Repository } from 'typeorm';
import { AplicativoService } from '../aplicativo/aplicativo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { FindAllDispositivoDto } from './dto/find-all-dispositivo.dto';
import { Dispositivo } from './entities/dispositivo.entity';

@Injectable()
export class DispositivoService {
    constructor(
        @InjectRepository(Dispositivo)
        private dispositivoRepo: Repository<Dispositivo>,
        private connection: Connection,
        private readonly aplicativoService: AplicativoService,
        private readonly usuarioService: UsuarioService,
    ) {}

    async create(usuarioAutenticado: IUsuarioAutenticado, createDispositivoDto: CreateDispositivoDto) {
        const { usuario, aplicativo, codigo, tokenFirebase } = createDispositivoDto;

        await this.aplicativoService.findOne(aplicativo.id);

        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const cadUsuario = await this.usuarioService.createUsuario(usuarioAutenticado, usuario, queryRunner);

            const dispositivos = await queryRunner.manager.find(Dispositivo, {
                where: {
                    codigo,
                    aplicativoId: aplicativo.id,
                    tokenFirebase,
                    usuarioId: Not(cadUsuario.id),
                    cancelado: false,
                },
            });

            for (let i = 0; i < dispositivos.length; i++) {
                const element = dispositivos[i];

                element.alteradoPorTipo = usuarioAutenticado.tipoMatricula;
                element.alteradoPorMatricula = usuarioAutenticado.codigoMatricula;
                element.alteradoEm = new Date();
                element.cancelado = false;
                element.tokenFirebase = null;

                await queryRunner.manager.update(Dispositivo, element.id, element);
            }

            let dispositivo = await queryRunner.manager.findOne(Dispositivo, {
                where: {
                    codigo,
                    aplicativoId: aplicativo.id,
                    usuarioId: cadUsuario.id,
                    cancelado: false,
                },
            });

            if (dispositivo) {
                dispositivo.alteradoPorTipo = usuarioAutenticado.tipoMatricula;
                dispositivo.alteradoPorMatricula = usuarioAutenticado.codigoMatricula;
                dispositivo.alteradoEm = new Date();
                dispositivo.cancelado = false;
                dispositivo.tokenFirebase = tokenFirebase;

                await queryRunner.manager.update(Dispositivo, dispositivo.id, dispositivo);
            } else {
                dispositivo = this.dispositivoRepo.create();
                dispositivo.alteradoPorTipo = usuarioAutenticado.tipoMatricula;
                dispositivo.alteradoPorMatricula = usuarioAutenticado.codigoMatricula;
                dispositivo.usuarioId = cadUsuario.id;
                dispositivo.aplicativoId = aplicativo.id;
                dispositivo.codigo = codigo;
                dispositivo.tokenFirebase = tokenFirebase;

                dispositivo = await queryRunner.manager.save(dispositivo);
            }

            await queryRunner.commitTransaction();

            dispositivo = await queryRunner.manager.findOne(Dispositivo, {
                where: {
                    id: dispositivo.id,
                },
            });

            return {
                id: dispositivo.id,
                aplicativoId: dispositivo.aplicativoId,
                usuarioId: dispositivo.usuarioId,
                codigo: dispositivo.codigo,
                tokenFirebase: dispositivo.tokenFirebase,
            };
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

    async findAll(query: FindAllDispositivoDto) {
        const page = +query.page;
        const take = query.limit ? +query.limit : 20;
        const deletedo = query.deletedo === 'true';
        const codigo = query.codigo ?? null;

        const skip = take * (page - 1);

        const result = await this.dispositivoRepo.findAndCount({
            select: ['id', 'aplicativoId', 'usuarioId', 'codigo', 'tokenFirebase'],
            where: {
                ...(codigo ? { codigo: ILike(`%${String(codigo).replace(/ /g, '%')}%`) } : undefined),
                cancelado: deletedo,
            },
            take,
            skip,
            order: {
                id: 'ASC',
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
        const dispositivo = await this.dispositivoRepo.findOne({
            where: {
                id,
                cancelado: false,
            },
        });

        if (!dispositivo) {
            throw new BadRequestException('Dispositivo não encontrado.');
        }

        return {
            id: dispositivo.id,
            aplicativoId: dispositivo.aplicativoId,
            usuarioId: dispositivo.usuarioId,
            codigo: dispositivo.codigo,
            tokenFirebase: dispositivo.tokenFirebase,
        };
    }

    async remove(usuarioAutenticado: IUsuarioAutenticado, id: number) {
        await this.findOne(id);

        const dispositivo = this.dispositivoRepo.create({
            alteradoPorTipo: usuarioAutenticado.tipoMatricula,
            alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
            alteradoEm: new Date(),
            cancelado: false,
        });

        await this.dispositivoRepo.update(id, dispositivo);

        return { message: 'Dispositivo removido com sucesso' };
    }
}
