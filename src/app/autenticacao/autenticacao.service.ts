import { Injectable } from '@nestjs/common';
import { CreateAutenticacaoDto } from './dto/create-autenticacao.dto';
import { UpdateAutenticacaoDto } from './dto/update-autenticacao.dto';

@Injectable()
export class AutenticacaoService {
  create(createAutenticacaoDto: CreateAutenticacaoDto) {
    return 'This action adds a new autenticacao';
  }

  findAll() {
    return `This action returns all autenticacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autenticacao`;
  }

  update(id: number, updateAutenticacaoDto: UpdateAutenticacaoDto) {
    return `This action updates a #${id} autenticacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacao`;
  }
}
