import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo; // dependency injection
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create a new user instance using repo (this is safer as validation rule is applied), but not persist it to DB
    return this.repo.save(user); // this saves a User Entity instance to db, not a plain user object, so hooks to the entity will be called
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // Partial comes from typescript, it declares a type consisting of any partial fields of User, providing flexibilities
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id); // entity
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, attrs); // assign partial fields to user
    return this.repo.save(user); // save entity, apply hooks
  }

  async remove(id: number) {
    const user = await this.findOne(id); // entity
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return this.repo.remove(user); // remove entity, apply hooks
  }
}

// const userService = new UsersService();
