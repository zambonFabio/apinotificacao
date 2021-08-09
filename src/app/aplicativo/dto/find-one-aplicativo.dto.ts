import { ApiProperty } from '@nestjs/swagger';

export class FindOneAplicativoResponseDto {
    @ApiProperty({ required: true, description: 'Identificador do Aplicativo.' })
    id: number;

    @ApiProperty({ required: true, description: 'Nome do Aplicativo.' })
    nome: string;

    @ApiProperty({ required: false, description: 'Credenciais do Aplicativo no Firebase.' })
    credencialFirebase?: string;
}
