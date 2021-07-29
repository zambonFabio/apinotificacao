import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAplicativoDto {
    @ApiProperty({ required: true, description: 'Nome do Aplicativo.' })
    @IsNotEmpty({ message: 'Nome do aplicativo deve ser informado.' })
    nome: string;

    @ApiProperty({ required: false, description: 'Credenciais do Aplicativo no Firebase.' })
    credencialFirebase?: string;
}
