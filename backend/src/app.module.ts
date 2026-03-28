import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvisorsModule } from './advisors/advisors.module';
import { QuizModule } from './quiz/quiz.module';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //читаем env
   TypeOrmModule.forRoot({
  type: 'postgres',
  // Если есть ссылка в Render - берем ее, иначе используем локальную
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/couplr_db',
  
  // Для облачной базы Neon ОБЯЗАТЕЛЬНО нужен SSL
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  
  autoLoadEntities: true,
  synchronize: false, // (Оставь то значение synchronize, которое у тебя стояло до этого)
}),
    AdvisorsModule,
    MessagesModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}