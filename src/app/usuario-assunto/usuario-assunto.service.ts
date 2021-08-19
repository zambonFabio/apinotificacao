import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { Connection, Repository } from 'typeorm';
import { AssuntoService } from '../assunto/assunto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioAssuntoDto } from './dto/create-usuario-assunto.dto';
import { UpdateUsuarioAssuntoDto } from './dto/update-usuario-assunto.dto';
import { UsuarioAssunto } from './entities/usuario-assunto.entity';

@Injectable()
export class UsuarioAssuntoService {
    constructor(
        @InjectRepository(UsuarioAssunto)
        private usuarioAssuntoRepo: Repository<UsuarioAssunto>,
        private connection: Connection,
        private readonly usuarioService: UsuarioService,
        private readonly assuntoService: AssuntoService,
    ) {}

    async create(usuarioAutenticado: IUsuarioAutenticado, createUsuarioAssuntoDto: CreateUsuarioAssuntoDto) {
        const { usuario, assuntos } = createUsuarioAssuntoDto;

        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const cadUsuario = await this.usuarioService.createUsuario(usuarioAutenticado, usuario, queryRunner);

            let assuntosRelacionados = await queryRunner.manager.find(UsuarioAssunto, {
                where: {
                    usuarioId: cadUsuario.id,
                    cancelado: false,
                },
            });

            for (let i = 0; i < assuntos.length; i++) {
                const { assunto } = assuntos[i];
                let assuntoRelacionado = false;

                for (let j = 0; j < assuntosRelacionados.length; j++) {
                    if (assunto.id == assuntosRelacionados[j].assuntoId) {
                        assuntoRelacionado = true;
                        break;
                    }
                }

                if (!assuntoRelacionado) {
                    await this.assuntoService.findOne(assunto.id);

                    const usuarioAssunto = this.usuarioAssuntoRepo.create({
                        alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                        alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                        usuarioId: cadUsuario.id,
                        assuntoId: assunto.id,
                    });

                    await queryRunner.manager.save(usuarioAssunto);
                }
            }

            for (let i = 0; i < assuntosRelacionados.length; i++) {
                let removerRelacionamentoDeAssunto = true;
                for (let j = 0; j < assuntos.length; j++) {
                    const { assunto } = assuntos[j];
                    if (assuntosRelacionados[i].assuntoId == assunto.id) {
                        removerRelacionamentoDeAssunto = false;
                        break;
                    }
                }

                if (removerRelacionamentoDeAssunto) {
                    await queryRunner.manager.update(UsuarioAssunto, assuntosRelacionados[i].id, {
                        alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                        alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                        alteradoEm: new Date(),
                        cancelado: true,
                    });
                }
            }

            await queryRunner.commitTransaction();

            assuntosRelacionados = await this.usuarioAssuntoRepo.find({
                where: {
                    usuarioId: cadUsuario.id,
                    cancelado: false,
                },
            });

            const returnUsuarioAssunto = {
                usuario: { uid: cadUsuario.uid },
                assuntos: [],
            };

            for (let i = 0; i < assuntosRelacionados.length; i++) {
                const assunto = await this.assuntoService.findOne(assuntosRelacionados[i].assuntoId);

                returnUsuarioAssunto.assuntos[i] = { assunto: { id: assunto.id } };
            }

            return returnUsuarioAssunto;
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

    // findAll() {
    //     return `This action returns all usuarioAssunto`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} usuarioAssunto`;
    // }

    // update(id: number, updateUsuarioAssuntoDto: UpdateUsuarioAssuntoDto) {
    //     return `This action updates a #${id} usuarioAssunto`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} usuarioAssunto`;
    // }
}
