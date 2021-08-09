import { Module } from '@nestjs/common';
import { AssuntoService } from './assunto.service';
import { AssuntoController } from './assunto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assunto } from './entities/assunto.entity';
import { AplicativoAssunto } from '../aplicativo-assunto/entities/aplicativo-assunto.entity';
import { AplicativoAssuntoService } from '../aplicativo-assunto/aplicativo-assunto.service';
import { AplicativoService } from '../aplicativo/aplicativo.service';
import { Aplicativo } from '../aplicativo/entities/aplicativo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Assunto, AplicativoAssunto, Aplicativo])],
    controllers: [AssuntoController],
    providers: [AplicativoAssuntoService, AssuntoService, AplicativoService],
})
export class AssuntoModule {}
