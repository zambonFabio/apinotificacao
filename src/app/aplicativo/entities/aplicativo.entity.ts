import { AplicativoAssunto } from 'src/app/aplicativo-assunto/entities/aplicativo-assunto.entity';
import { Dispositivo } from 'src/app/dispositivo/entities/dispositivo.entity';
import { BeforeInsert, Column, Entity, getManager, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('GNTF_APLICATIVO')
export class Aplicativo {
    @PrimaryColumn({ name: 'ID_APLICATIVO' })
    id: number;

    @Column({ name: 'NM_APLICATIVO' })
    nome: string;

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

    @Column({ name: 'DS_CREDENCFB' })
    credencialFirebase?: string;

    @OneToMany(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.aplicativo)
    @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'aplicativoId' })
    dispositivos: Dispositivo[];

    @OneToMany(() => AplicativoAssunto, (aplicativoAssunto: AplicativoAssunto) => aplicativoAssunto.aplicativo)
    @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'aplicativoId' })
    AplicativoAssuntoAplicativos: Dispositivo[];

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_APLICATIVO_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
