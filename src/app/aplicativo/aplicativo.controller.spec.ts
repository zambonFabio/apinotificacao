import { Test, TestingModule } from '@nestjs/testing';
import { AplicativoController } from './aplicativo.controller';
import { AplicativoService } from './aplicativo.service';

describe('AplicativoController', () => {
    let controller: AplicativoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AplicativoController],
            providers: [AplicativoService],
        }).compile();

        controller = module.get<AplicativoController>(AplicativoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
