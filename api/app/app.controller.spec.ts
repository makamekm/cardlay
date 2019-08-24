import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('App', () => {
  describe('Controller', () => {
    let appController: AppController;

    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile();

      appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
      it('should return "Hello World!"', () => {
        expect(appController.root()).toBe('Hello World!');
      });
    });

    describe('pong', () => {
      it('should return "pong"', () => {
        expect(appController.ping()).toBe('pong');
      });
    });
  });
});
