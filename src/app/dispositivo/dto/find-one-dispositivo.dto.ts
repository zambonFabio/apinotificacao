import { ApiProperty } from '@nestjs/swagger';

export class FindOneDispositivoResponseDto {
    @ApiProperty({ required: true, description: 'Id do Dispositivo.' })
    id: number;

    @ApiProperty({ required: true, description: 'Id do Aplicativo.' })
    aplicativoId: number;

    @ApiProperty({ required: true, description: 'Id do Usuario.' })
    usuarioId: number;

    @ApiProperty({ required: true, description: 'Código do dispositivo.' })
    codigo: string;

    @ApiProperty({ required: false, description: 'Token do dispositivo gerado pelo Firebase.' })
    tokenFirebase?: string;
}
