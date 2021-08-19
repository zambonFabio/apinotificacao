import { Dispositivo } from 'src/app/dispositivo/entities/dispositivo.entity';
import { UsuarioAssunto } from 'src/app/usuario-assunto/entities/usuario-assunto.entity';
import { BeforeInsert, Column, Entity, getManager, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('GNTF_USUARIO')
export class Usuario {
    @PrimaryColumn({ name: 'ID_USUARIO' })
    id: number;

    @Column({ name: 'CD_UID' })
    uid: string;

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

    @OneToMany(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.usuario)
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'usuarioId' })
    dispositivos: Dispositivo[];

    @OneToMany(() => UsuarioAssunto, (usuarioAssunto: UsuarioAssunto) => usuarioAssunto.usuario)
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'usuarioId' })
    UsuarioAssuntoUsuarios: UsuarioAssunto[];

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_USUARIO_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
