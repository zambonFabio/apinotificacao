import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AplicativoAssunto } from 'src/app/aplicativo-assunto/entities/aplicativo-assunto.entity';
import { Dispositivo } from 'src/app/dispositivo/entities/dispositivo.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    getManager,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('GNTF_APLICATIVO')
export class Aplicativo {
    @PrimaryGeneratedColumn('uuid', { name: 'ID_APLICATIVO', comment: 'Identificador do Aplicativo' })
    @ApiProperty({ description: 'Identificador do Aplicativo' })
    id: string;

    @Column({ name: 'NM_APLICATIVO', length: 100, comment: 'Nome do Aplicativo' })
    @ApiProperty({ maxLength: 100, description: 'Nome do Aplicativo' })
    nome: string;

    @DeleteDateColumn({ name: 'DT_TRSCANC', comment: 'Data de remoção do Aplicativo' })
    @ApiProperty({ description: 'Data de remoção do Aplicativo' })
    canceladoEm?: Date;

    @Column({ name: 'TP_MATRCRIA', precision: 2, comment: 'Tipo de matrícula do criador do Aplicativo' })
    @ApiProperty({ maxLength: 2, description: 'Tipo de matrícula do criador do Aplicativo' })
    criadoPorTipo: number;

    @Column({ name: 'CD_MATRCRIA', precision: 7, comment: 'Código da matrícula do criador do Aplicativo' })
    @ApiProperty({ maxLength: 7, description: 'Código da matrícula do criador do Aplicativo' })
    criadoPorMatricula: number;

    @CreateDateColumn({ name: 'DT_TRSCRIA', comment: 'Data de criação do Aplicativo' })
    @ApiProperty({ description: 'Data de criação do Aplicativo' })
    criadoEm: Date;

    @Column({ name: 'TP_MATRICULA', precision: 2, comment: 'Tipo de matrícula do criador ou alterador do Aplicativo' })
    @ApiProperty({ maxLength: 2, description: 'Tipo de matrícula do criador ou alterador do Aplicativo' })
    alteradoPorTipo: number;

    @Column({ name: 'CD_MATRICULA', precision: 7, comment: 'Código da matrícula do criador ou alterador do Aplicativo' })
    @ApiProperty({ maxLength: 7, description: 'Código da matrícula do criador ou alterador do Aplicativo' })
    alteradoPorMatricula: number;

    @UpdateDateColumn({ name: 'DT_TRANSACAO', comment: 'Data de criação ou alteração do Aplicativo' })
    @ApiProperty({ description: 'Data de criação ou alteração do Aplicativo' })
    alteradoEm: Date;

    @Column({ name: 'DS_CREDENCFB', type: 'clob', nullable: true, comment: 'Credenciais utilizadas para comunicação com o Firebase' })
    @ApiPropertyOptional({ description: 'Credenciais utilizadas para comunicação com o Firebase' })
    credencialFirebase?: string;

    // @OneToMany(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.aplicativo)
    // @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'aplicativoId' })
    // dispositivos: Dispositivo[];

    // @OneToMany(() => AplicativoAssunto, (aplicativoAssunto: AplicativoAssunto) => aplicativoAssunto.aplicativo)
    // @JoinColumn({ name: 'ID_APLICATIVO', referencedColumnName: 'aplicativoId' })
    // AplicativoAssuntoAplicativos: AplicativoAssunto[];

    @BeforeInsert()
    async beforeinsert() {
        this.criadoPorTipo = this.alteradoPorTipo;
        this.criadoPorMatricula = this.alteradoPorMatricula;
        // this.alteradoEm = new Date();
        // this.criadoEm = this.alteradoEm;

        // const res = await getManager().query('select GNTF_APLICATIVO_SEQ.nextval ID from dual');
        // this.id = res[0].ID;
    }
}
