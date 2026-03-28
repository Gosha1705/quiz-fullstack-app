import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async sendMessage(data: { advisorId: number; senderName: string; senderEmail: string; body: string }) {
    const newMessage = this.messageRepo.create(data);
    return await this.messageRepo.save(newMessage);
  }
}