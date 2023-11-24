import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // private messageService: MessagesService;
  // constructor(messageService: MessagesService) {
  //   this.messageService = messageService;       // ! dependency injection
  // }

  // syntax sugar: equivalent to above
  constructor(private messageService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messageService.findAll();
  }

  // how does Dto type preserved in javascript at runtime?
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found!');
    }
    return message;
  }
}
