import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
    @ApiProperty({ required: true, description: 'UID do usuário do sistema de origem.' })
    @IsNotEmpty({ message: 'UID do usuário do sistema de origem deve ser informado.' })
    uid: string;
}

export class CreateUsuarioResponseDto {
    @ApiProperty({ required: true, description: 'Identificador do usuário.' })
    id: string;

    @ApiProperty({ required: true, description: 'UID do usuário do sistema de origem.' })
    uid: string;
}
