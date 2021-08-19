import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioAssuntoController } from './usuario-assunto.controller';
import { UsuarioAssuntoService } from './usuario-assunto.service';

describe('UsuarioAssuntoController', () => {
  let controller: UsuarioAssuntoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioAssuntoController],
      providers: [UsuarioAssuntoService],
    }).compile();

    controller = module.get<UsuarioAssuntoController>(UsuarioAssuntoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
