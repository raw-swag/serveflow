import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('check', () => {
    it('should return health status ok', () => {
      const res = healthController.check();
      expect(res.status).toBe('ok');
      expect(res.service).toBe('ServeFlow API Engine');
      expect(typeof res.timestamp).toBe('string');
    });
  });
});
