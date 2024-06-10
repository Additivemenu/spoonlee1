// src/items/dto/update-item.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
