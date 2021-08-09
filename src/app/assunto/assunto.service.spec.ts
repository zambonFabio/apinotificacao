import { Test, TestingModule } from '@nestjs/testing';
import { AssuntoService } from './assunto.service';

describe('AssuntoService', () => {
  let service: AssuntoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssuntoService],
    }).compile();

    service = module.get<AssuntoService>(AssuntoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
