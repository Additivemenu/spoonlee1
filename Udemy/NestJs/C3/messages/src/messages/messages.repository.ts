import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

// here for simplicity,  we just use a json file as a database
@Injectable()       // like @Bean in Spring
export class MessagesRepository{
    async findOne(id: string){
        const contents = await readFile('messages.json', 'utf-8');
        const messages = JSON.parse(contents);  // to js obj
        return messages[id];
    }

    async findAll(){
        const contents = await readFile('messages.json', 'utf-8');
        const messages = JSON.parse(contents);  // to js obj
        return messages;
    }

    async create(content: string){
        const contents = await readFile('messages.json', 'utf-8');
        const messages = JSON.parse(contents);  // to js obj
        const id = Math.floor(Math.random() * 999);  

        messages[id] = { id, content };

        await writeFile('messages.json', JSON.stringify(messages));
    }

}