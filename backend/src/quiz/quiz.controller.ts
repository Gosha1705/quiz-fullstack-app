import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  submitQuiz(@Body() body: { sessionId: string; answers: any }) {
    return this.quizService.processQuiz(body.sessionId, body.answers);
  }
}