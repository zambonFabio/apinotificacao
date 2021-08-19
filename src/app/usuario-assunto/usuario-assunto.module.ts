import { Module } from '@nestjs/common';
import { UsuarioAssuntoService } from './usuario-assunto.service';
import { UsuarioAssuntoController } from './usuario-assunto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioAssunto } from './entities/usuario-assunto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Assunto } from '../assunto/entities/assunto.entity';
import { AssuntoService } from '../assunto/assunto.service';
import { AplicativoAssuntoService } from '../aplicativo-assunto/aplicativo-assunto.service';
import { AplicativoAssunto } from '../aplicativo-assunto/entities/aplicativo-assunto.entity';
import { Aplicativo } from '../aplicativo/entities/aplicativo.entity';
import { AplicativoService } from '../aplicativo/aplicativo.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioAssunto, Usuario, Assunto, AplicativoAssunto, Aplicativo])],
    controllers: [UsuarioAssuntoController],
    providers: [UsuarioAssuntoService, UsuarioService, AssuntoService, AplicativoAssuntoService, AplicativoService],
})
export class UsuarioAssuntoModule {}
