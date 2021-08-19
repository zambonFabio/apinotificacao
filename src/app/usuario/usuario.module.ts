import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioAssunto } from '../usuario-assunto/entities/usuario-assunto.entity';
import { UsuarioAssuntoService } from '../usuario-assunto/usuario-assunto.service';
import { Assunto } from '../assunto/entities/assunto.entity';
import { AssuntoService } from '../assunto/assunto.service';
import { AplicativoAssuntoService } from '../aplicativo-assunto/aplicativo-assunto.service';
import { AplicativoAssunto } from '../aplicativo-assunto/entities/aplicativo-assunto.entity';
import { Aplicativo } from '../aplicativo/entities/aplicativo.entity';
import { AplicativoService } from '../aplicativo/aplicativo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, UsuarioAssunto, Assunto, AplicativoAssunto, Aplicativo])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioAssuntoService, AssuntoService, AplicativoAssuntoService, AplicativoService],
})
export class UsuarioModule {}
