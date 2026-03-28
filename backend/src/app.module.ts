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
  // Вставь свою ссылку Neon внутри кавычек:
  url: 'postgresql://neondb_owner:npg_o7NWzlYGwvV2@ep-curly-sky-adpotklx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: false, // Оставь как было в твоем коде (true или false)
}),
    AdvisorsModule,
    MessagesModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}