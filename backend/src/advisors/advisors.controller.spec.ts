import { Test, TestingModule } from '@nestjs/testing';
import { AdvisorsController } from './advisors.controller';
import { AdvisorsService } from './advisors.service';

describe('AdvisorsController', () => {
  let controller: AdvisorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisorsController],
      providers: [AdvisorsService],
    }).compile();

    controller = module.get<AdvisorsController>(AdvisorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
