import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioAssuntoService } from './usuario-assunto.service';

describe('UsuarioAssuntoService', () => {
  let service: UsuarioAssuntoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioAssuntoService],
    }).compile();

    service = module.get<UsuarioAssuntoService>(UsuarioAssuntoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
