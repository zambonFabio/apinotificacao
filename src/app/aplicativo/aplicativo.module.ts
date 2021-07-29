import { Module } from '@nestjs/common';
import { AplicativoService } from './aplicativo.service';
import { AplicativoController } from './aplicativo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplicativo } from './entities/aplicativo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Aplicativo])],
    controllers: [AplicativoController],
    providers: [AplicativoService],
})
export class AplicativoModule {}
