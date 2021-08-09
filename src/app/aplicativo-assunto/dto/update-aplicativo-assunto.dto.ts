import { PartialType } from '@nestjs/swagger';
import { CreateAplicativoAssuntoDto } from './create-aplicativo-assunto.dto';

export class UpdateAplicativoAssuntoDto extends PartialType(CreateAplicativoAssuntoDto) {}
