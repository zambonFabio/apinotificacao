import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Aplicativo } from '../entities/aplicativo.entity';

export class FindAllAplicativoSwagger {
    @ApiProperty({
        type: OmitType(Aplicativo, [
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
        ]),
        isArray: true,
        description: 'Lista de Aplicativos',
    })
    result: Aplicativo[];

    @ApiProperty({ description: 'Total de Aplicativos.' })
    total: number;

    @ApiProperty({ description: 'Número da página de paginação.' })
    page: number;

    @ApiProperty({ description: 'Limite de itens por página.' })
    limit: number;
}
