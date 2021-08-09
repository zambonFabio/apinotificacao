import { PartialType } from '@nestjs/swagger';
import { CreateAssuntoDto } from './create-assunto.dto';

export class UpdateAssuntoDto extends PartialType(CreateAssuntoDto) {}
