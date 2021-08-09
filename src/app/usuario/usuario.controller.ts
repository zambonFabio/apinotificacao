import { Controller, Param, Post, Query, Body, UseGuards, Request, ValidationPipe, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, CreateUsuarioResponseDto } from './dto/create-usuario.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { FindAllUsuarioDto, FindAllUsuarioResponseDto } from './dto/find-all-usuario.dto';
import { FindOneUsuarioResponseDto } from './dto/find-one-usuario.dto';

@ApiTags('Usuário do sistema de origem')
@Controller('/v1/usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateUsuarioResponseDto })
    create(@Request() req, @Body(new ValidationPipe()) createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(req.user, createUsuarioDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindAllUsuarioResponseDto })
    findAll(@Query(new ValidationPipe()) query: FindAllUsuarioDto) {
        return this.usuarioService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindOneUsuarioResponseDto })
    findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(+id);
    }
}
