import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizResponse } from './entities/quiz-response.entity';
import { Match } from './entities/match.entity';
import { Advisor } from '../advisors/entities/advisor.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizResponse) private quizResponseRepo: Repository<QuizResponse>,
    @InjectRepository(Match) private matchRepo: Repository<Match>,
    @InjectRepository(Advisor) private advisorRepo: Repository<Advisor>,
  ) {}

  async processQuiz(sessionId: string, answers: any) {
    const quizResponse = this.quizResponseRepo.create({ sessionId, answers });
    const savedResponse = await this.quizResponseRepo.save(quizResponse);

    const advisors = await this.advisorRepo.find();

    const scoredAdvisors = advisors.map(advisor => {
      const score = Math.floor(Math.random() * 50) + 50; 
      return { advisor, score };
    });

    scoredAdvisors.sort((a, b) => b.score - a.score);
    const top3 = scoredAdvisors.slice(0, 3);

    const matchesToSave = top3.map(item => {
      return this.matchRepo.create({
        quizResponseId: savedResponse.id,
        advisorId: item.advisor.id,
        score: item.score,
      });
    });
    await this.matchRepo.save(matchesToSave);

    return {
      quizResponseId: savedResponse.id,
      matches: top3,
    };
  }
}