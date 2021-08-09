import { Test, TestingModule } from '@nestjs/testing';
import { AplicativoAssuntoController } from './aplicativo-assunto.controller';
import { AplicativoAssuntoService } from './aplicativo-assunto.service';

describe('AplicativoAssuntoController', () => {
  let controller: AplicativoAssuntoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AplicativoAssuntoController],
      providers: [AplicativoAssuntoService],
    }).compile();

    controller = module.get<AplicativoAssuntoController>(AplicativoAssuntoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
