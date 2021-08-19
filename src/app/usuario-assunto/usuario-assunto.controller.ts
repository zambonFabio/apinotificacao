import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe, Query } from '@nestjs/common';
import { UsuarioAssuntoService } from './usuario-assunto.service';
import { CreateUsuarioAssuntoDto, CreateUsuarioAssuntoResponseDto } from './dto/create-usuario-assunto.dto';
import { UpdateUsuarioAssuntoDto } from './dto/update-usuario-assunto.dto';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAssuntosUsuarioDto, FindAssuntosUsuarioResponseDto } from './dto/find-assuntos-usuario.dto';

@ApiTags('Assuntos de notificação relacionados ao usuário')
@Controller('/v1/usuario-assunto')
export class UsuarioAssuntoController {
    constructor(private readonly usuarioAssuntoService: UsuarioAssuntoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateUsuarioAssuntoResponseDto })
    create(@Request() req, @Body(new ValidationPipe()) createUsuarioAssuntoDto: CreateUsuarioAssuntoDto) {
        return this.usuarioAssuntoService.create(req.user, createUsuarioAssuntoDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindAssuntosUsuarioResponseDto })
    findAll(@Query(new ValidationPipe()) query: FindAssuntosUsuarioDto) {
        return {};
        // return this.assuntoService.findAll(query);
    }

    // @Get()
    // findAll() {
    //     return this.usuarioAssuntoService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usuarioAssuntoService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUsuarioAssuntoDto: UpdateUsuarioAssuntoDto) {
    //     return this.usuarioAssuntoService.update(+id, updateUsuarioAssuntoDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usuarioAssuntoService.remove(+id);
    // }
}
