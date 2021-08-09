import { Test, TestingModule } from '@nestjs/testing';
import { AplicativoAssuntoService } from './aplicativo-assunto.service';

describe('AplicativoAssuntoService', () => {
  let service: AplicativoAssuntoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicativoAssuntoService],
    }).compile();

    service = module.get<AplicativoAssuntoService>(AplicativoAssuntoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
