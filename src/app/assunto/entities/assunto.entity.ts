import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from 'typeorm';

@Entity('GNTF_ASSUNTO')
export class Assunto {
    @PrimaryColumn({ name: 'ID_ASSUNTO' })
    id: number;

    @Column({ name: 'DS_ASSUNTO' })
    descricao: string;

    @Column({ name: 'IN_OPCIONAL' })
    opcional: boolean;

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

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_ASSUNTO_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
