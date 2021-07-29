import { Test, TestingModule } from '@nestjs/testing';
import { AplicativoService } from './aplicativo.service';

describe('AplicativoService', () => {
  let service: AplicativoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AplicativoService],
    }).compile();

    service = module.get<AplicativoService>(AplicativoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
