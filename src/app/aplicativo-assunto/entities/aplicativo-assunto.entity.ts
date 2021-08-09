import { Aplicativo } from 'src/app/aplicativo/entities/aplicativo.entity';
import { BeforeInsert, Column, Entity, getManager, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('GNTF_APLICASS')
export class AplicativoAssunto {
    @PrimaryColumn({ name: 'ID_APLICASS' })
    id: number;

    @Column({ name: 'ID_APLICATIVO' })
    aplicativoId: number;

    @Column({ name: 'ID_ASSUNTO' })
    assuntoId: number;

    @Column({ name: 'IN_CANCELADO' })
    cancelado: boolean;

    @Column({ name: 'TP_MATRCRIA' })
    criadoPorTipo: number;

    @Column({ name: 'CD_MATRCRIA' })
    criadoPorMatricula: number;

    @Column({ name: 'DT_TRSCRIA' })
    criadoEm: Date;

    @Column({ name: 'TP_MATRICULA' })
    alteradoPorTipo: number;

    @Column({ name: 'CD_MATRICULA' })
    alteradoPorMatricula: number;

    @Column({ name: 'DT_TRANSACAO' })
    alteradoEm: Date;

    @ManyToOne(() => Aplicativo, (aplicativo) => aplicativo.AplicativoAssuntoAplicativos)
    @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'id' })
    aplicativo: Aplicativo;

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_APLICASS_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
