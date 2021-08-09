import { Usuario } from '../../usuario/entities/usuario.entity';
import { BeforeInsert, Column, Entity, getManager, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Aplicativo } from 'src/app/aplicativo/entities/aplicativo.entity';

@Entity('GNTF_DISP')
export class Dispositivo {
    @PrimaryColumn({ name: 'ID_DISP' })
    id: number;

    @Column({ name: 'ID_USUARIO' })
    usuarioId: number;

    @Column({ name: 'ID_APLICATIVO' })
    aplicativoId: number;

    @Column({ name: 'CD_DISP' })
    codigo: string;

    @Column({ name: 'IN_CANCELADO', default: false })
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

    @Column({ name: 'CD_TOKENFB' })
    tokenFirebase?: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.dispositivos)
    @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
    usuario: Usuario;

    @ManyToOne(() => Aplicativo, (aplicativo) => aplicativo.dispositivos)
    @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'id' })
    aplicativo: Aplicativo;

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        this.alteradoEm = new Date();
        this.criadoEm = this.alteradoEm;
        this.cancelado = false;

        const res = await getManager().query('select GNTF_DISP_SEQ.nextval ID from dual');
        this.id = res[0].ID;
    }
}
