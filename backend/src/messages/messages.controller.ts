import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(@Body() body: { advisorId: number; senderName: string; senderEmail: string; body: string }) {
    return this.messagesService.sendMessage(body);
  }
}