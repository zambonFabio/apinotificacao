import { Test, TestingModule } from '@nestjs/testing';
import { AssuntoController } from './assunto.controller';
import { AssuntoService } from './assunto.service';

describe('AssuntoController', () => {
  let controller: AssuntoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssuntoController],
      providers: [AssuntoService],
    }).compile();

    controller = module.get<AssuntoController>(AssuntoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
