import { PartialType } from '@nestjs/swagger';
import { CreateAutenticacaoDto } from './create-autenticacao.dto';

export class UpdateAutenticacaoDto extends PartialType(CreateAutenticacaoDto) {}
