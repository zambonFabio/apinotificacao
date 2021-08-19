import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';
import { QueryRunner, Repository } from 'typeorm';
import { AplicativoService } from '../aplicativo/aplicativo.service';
import { AplicativoAssunto } from './entities/aplicativo-assunto.entity';

class IAplicativo {
    id: number;
}

class IAplicativoAssunto {
    aplicativo: IAplicativo;
}

@Injectable()
export class AplicativoAssuntoService {
    constructor(
        @InjectRepository(AplicativoAssunto)
        private aplicativoAssuntoRepo: Repository<AplicativoAssunto>,
        private readonly aplicativoService: AplicativoService,
    ) {}

    async aplicativoAssuntoPorAssunto(
        usuarioAutenticado: IUsuarioAutenticado,
        assuntoId: number,
        aplicativos: IAplicativoAssunto[],
        queryRunner: QueryRunner,
    ) {
        const aplicativosRelacionados = await queryRunner.manager.find(AplicativoAssunto, {
            where: {
                assuntoId,
                cancelado: false,
            },
        });

        for (let i = 0; i < aplicativos.length; i++) {
            const { aplicativo } = aplicativos[i];
            let aplicativoRelacionado = false;

            for (let j = 0; j < aplicativosRelacionados.length; j++) {
                if (aplicativo.id == aplicativosRelacionados[j].aplicativoId) {
                    aplicativoRelacionado = true;
                    break;
                }
            }

            if (!aplicativoRelacionado) {
                // await this.aplicativoService.findOne(aplicativo.id);

                const aplicativoAssunto = this.aplicativoAssuntoRepo.create({
                    alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                    alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                    assuntoId,
                    aplicativoId: aplicativo.id,
                });

                await queryRunner.manager.save(aplicativoAssunto);
            }
        }

        for (let i = 0; i < aplicativosRelacionados.length; i++) {
            let removerRelacionamentoDeAplicativo = true;
            for (let j = 0; j < aplicativos.length; j++) {
                const { aplicativo } = aplicativos[j];
                if (aplicativosRelacionados[i].aplicativoId == aplicativo.id) {
                    removerRelacionamentoDeAplicativo = false;
                    break;
                }
            }

            if (removerRelacionamentoDeAplicativo) {
                await queryRunner.manager.update(AplicativoAssunto, aplicativosRelacionados[i].id, {
                    alteradoPorTipo: usuarioAutenticado.tipoMatricula,
                    alteradoPorMatricula: usuarioAutenticado.codigoMatricula,
                    alteradoEm: new Date(),
                    cancelado: true,
                });
            }
        }

        return;
    }
}
