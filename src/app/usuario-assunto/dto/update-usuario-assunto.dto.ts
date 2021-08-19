import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioAssuntoDto } from './create-usuario-assunto.dto';

export class UpdateUsuarioAssuntoDto extends PartialType(CreateUsuarioAssuntoDto) {}
