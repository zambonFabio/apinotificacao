import { Module } from '@nestjs/common';
import { DispositivoService } from './dispositivo.service';
import { DispositivoController } from './dispositivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from './entities/dispositivo.entity';
import { AplicativoService } from '../aplicativo/aplicativo.service';
import { Aplicativo } from '../aplicativo/entities/aplicativo.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([Dispositivo, Aplicativo, Usuario])],
    controllers: [DispositivoController],
    providers: [DispositivoService, AplicativoService, UsuarioService],
})
export class DispositivoModule {}
