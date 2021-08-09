import { Module } from '@nestjs/common';
import { AplicativoAssuntoService } from './aplicativo-assunto.service';
import { AplicativoAssuntoController } from './aplicativo-assunto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativoAssunto } from './entities/aplicativo-assunto.entity';
import { AplicativoService } from '../aplicativo/aplicativo.service';
import { Aplicativo } from '../aplicativo/entities/aplicativo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AplicativoAssunto, Aplicativo])],
    controllers: [AplicativoAssuntoController],
    providers: [AplicativoAssuntoService, AplicativoService],
})
export class AplicativoAssuntoModule {}
