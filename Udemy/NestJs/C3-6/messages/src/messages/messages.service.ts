import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()       // like @Bean in Spring
export class MessagesService{

    // private messagesRepo: MessagesRepository;
    // constructor(messagesRepo: MessagesRepository){
    //     this.messagesRepo = messagesRepo;       // ! dependency injection
    // }

    // syntax sugar: equivalent to above
    constructor(private messagesRepo: MessagesRepository){} 

    // 套娃
    findOne(id: string){
        return this.messagesRepo.findOne(id);
    }

    findAll(){
        return this.messagesRepo.findAll();
    }

    create(content: string){
        return this.messagesRepo.create(content);
    }
}