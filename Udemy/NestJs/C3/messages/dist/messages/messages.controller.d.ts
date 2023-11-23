import { CreateMessageDto } from './dtos/create-message.dto';
export declare class MessagesController {
    listMessages(): {
        id: number;
        text: string;
    }[];
    createMessage(body: CreateMessageDto): void;
    getMessage(id: string): void;
}
