import { Usuario } from 'src/app/usuario/entities/usuario.entity';
import { BeforeInsert, Column, Entity, getManager, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('GNTF_USUARIOASS')
export class UsuarioAssunto {
    @PrimaryColumn({ name: 'ID_USUARIOASS' })
    id: number;

    @Column({ name: 'ID_USUARIO' })
    usuarioId: number;

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

    @ManyToOne(() => Usuario, (usuario) => usuario.UsuarioAssuntoUsuarios)
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
    usuario: Usuario;

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_USUARIOASS_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
