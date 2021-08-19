import { OmitType } from '@nestjs/swagger';
import { Aplicativo } from '../entities/aplicativo.entity';

export class CreateAplicativoSwagger extends OmitType(Aplicativo, [
    // 'AplicativoAssuntoAplicativos',
    'alteradoEm',
    'alteradoPorMatricula',
    'alteradoPorTipo',
    'beforeinsert',
    'canceladoEm',
    'criadoEm',
    'criadoPorMatricula',
    'criadoPorTipo',
    // 'dispositivos',
]) {}
