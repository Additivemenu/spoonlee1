// src/items/items.service.spec.ts
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', () => {
      const result = service.findAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return one item by id', () => {
      const items = service.findAll();
      const item = service.findOne(items[0].id);
      expect(item).toEqual(items[0]);
    });

    it('should throw NotFoundException if item not found', () => {
      expect(() => service.findOne('non-existing-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new item', () => {
      const createItemDto: CreateItemDto = {
        title: 'New Item',
        description: 'New Description',
      };
      const item = service.create(createItemDto);
      expect(item).toHaveProperty('id');
      expect(item.title).toEqual('New Item');
      expect(item.description).toEqual('New Description');
    });
  });

  describe('update', () => {
    it('should update an existing item', () => {
      const items = service.findAll();
      const updateItemDto: UpdateItemDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };
      const updatedItem = service.update(items[0].id, updateItemDto);
      expect(updatedItem.title).toEqual('Updated Title');
      expect(updatedItem.description).toEqual('Updated Description');
    });

    it('should throw NotFoundException if item not found', () => {
      const updateItemDto: UpdateItemDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };
      expect(() => service.update('non-existing-id', updateItemDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing item', () => {
      const items = service.findAll();
      service.delete(items[0].id);
      expect(service.findAll()).toHaveLength(1);
    });

    it('should throw NotFoundException if item not found', () => {
      expect(() => service.delete('non-existing-id')).toThrow(
        NotFoundException,
      );
    });
  });
});
