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
    TypeOrmModule.forRootAsync({            //подключение к базе данных
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: false,
        autoLoadEntities: true, //возвращаем автоматический поиск сущностей
      }),
    }),
    AdvisorsModule,
    MessagesModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}