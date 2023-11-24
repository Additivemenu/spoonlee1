import { MessagesRepository } from "./messages.repository";
export declare class MessagesService {
    private messagesRepo;
    constructor(messagesRepo: MessagesRepository);
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    create(content: string): Promise<void>;
}
