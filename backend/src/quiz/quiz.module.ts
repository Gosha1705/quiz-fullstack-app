import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizResponse } from './entities/quiz-response.entity';
import { Match } from './entities/match.entity';
import { Advisor } from '../advisors/entities/advisor.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([QuizResponse, Match, Advisor])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}