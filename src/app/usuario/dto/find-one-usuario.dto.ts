import { ApiProperty } from '@nestjs/swagger';

export class FindOneUsuarioResponseDto {
    @ApiProperty({ required: true, description: 'Identificador do usuário.' })
    id: string;

    @ApiProperty({ required: true, description: 'UID do usuário do sistema de origem.' })
    uid: string;
}
