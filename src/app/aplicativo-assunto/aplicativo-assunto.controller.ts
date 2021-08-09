import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AplicativoAssuntoService } from './aplicativo-assunto.service';
import { CreateAplicativoAssuntoDto } from './dto/create-aplicativo-assunto.dto';
import { UpdateAplicativoAssuntoDto } from './dto/update-aplicativo-assunto.dto';

@Controller('aplicativo-assunto')
export class AplicativoAssuntoController {
    constructor(private readonly aplicativoAssuntoService: AplicativoAssuntoService) {}
}
