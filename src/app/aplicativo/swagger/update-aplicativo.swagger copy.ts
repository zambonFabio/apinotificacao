import { OmitType } from '@nestjs/swagger';
import { Aplicativo } from '../entities/aplicativo.entity';

export class UpdateAplicativoSwagger extends OmitType(Aplicativo, [
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
