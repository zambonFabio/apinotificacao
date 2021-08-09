import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, ValidationPipe, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { AssuntoService } from './assunto.service';
import { CreateAssuntoDto, CreateAssuntoResponseDto } from './dto/create-assunto.dto';
import { FindAllAssuntoDto, FindAllAssuntoResponseDto } from './dto/find-all-assunto.dto';
import { FindOneAssuntoResponseDto } from './dto/find-one-assunto.dto';
import { UpdateAssuntoDto } from './dto/update-assunto.dto';

@ApiTags('Assunto da notificação')
@Controller('/v1/assunto')
export class AssuntoController {
    constructor(private readonly assuntoService: AssuntoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateAssuntoResponseDto })
    create(@Request() req, @Body(new ValidationPipe()) createAssuntoDto: CreateAssuntoDto) {
        return this.assuntoService.create(req.user, createAssuntoDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindAllAssuntoResponseDto })
    findAll(@Query(new ValidationPipe()) query: FindAllAssuntoDto) {
        return this.assuntoService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindOneAssuntoResponseDto })
    findOne(@Param('id') id: string) {
        return this.assuntoService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: CreateAssuntoResponseDto })
    update(@Request() req, @Param('id') id: string, @Body() updateAssuntoDto: UpdateAssuntoDto) {
        return this.assuntoService.update(req.user, +id, updateAssuntoDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiOkResponse({ description: 'Assunto removido com sucesso' })
    remove(@Request() req, @Param('id') id: string) {
        return this.assuntoService.remove(req.user, +id);
    }
}
