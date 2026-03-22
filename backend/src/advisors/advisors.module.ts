import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvisorsService } from './advisors.service';
import { AdvisorsController } from './advisors.controller';
import { Advisor } from './entities/advisor.entity';

@Module({
  // Вот эта строчка импорта дает нашему сервису доступ к БД!
  imports: [TypeOrmModule.forFeature([Advisor])],
  controllers: [AdvisorsController],
  providers: [AdvisorsService],
})
export class AdvisorsModule {}