// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemsService {
  private items: Item[] = []; // like in-memory database

  constructor() {
    this.items.push({
      id: uuidv4(),
      title: 'Item 1',
      description: 'Description 1',
    });
    this.items.push({
      id: uuidv4(),
      title: 'Item 2',
      description: 'Description 2',
    });
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  create(createItemDto: CreateItemDto): Item {
    console.log(`item to create: ${JSON.stringify(createItemDto)}`);

    const newItem: Item = { id: uuidv4(), ...createItemDto };
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, updateItemDto: UpdateItemDto): Item {
    console.log(`item to update: ${JSON.stringify(updateItemDto)}`);

    const item = this.findOne(id);
    item.title = updateItemDto.title;
    item.description = updateItemDto.description;
    return item;
  }

  delete(id: string): void {
    console.log(`item id to delete: ${id}`);

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    this.items.splice(index, 1); // remove 1 element sitting at the index
  }
}
