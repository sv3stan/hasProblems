import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    hasProblems: boolean,
  ): Promise<User> {
    const user = new User();
    user.first_name = firstName;
    user.last_name = lastName;
    user.age = age;
    user.gender = gender;
    user.has_problems = hasProblems;
    return this.userRepository.save(user);
  }

  async getProblemsCount(): Promise<number> {
    return await this.userRepository.count({
      where: { has_problems: true },
    });
  }

  async resetProblems(): Promise<{ updatedCount: number }> {
    const count = await this.userRepository.count({
      where: { has_problems: true },
    });

    await this.userRepository.update(
      { has_problems: true },
      { has_problems: false },
    );

    return { updatedCount: count };
  }
  async resetAndCountProblems(): Promise<{ count: number; reset: boolean }> {
    const count = await this.getProblemsCount();
    await this.resetProblems();
    return { count, reset: true };
  }

  async updateRandomProblems(): Promise<{ updatedCount: number }> {
    const count = await this.userRepository.count();
    const targetCount = Math.round(count * 0.4);

    const randomIndexes = new Set<number>();
    while (randomIndexes.size < targetCount) {
      const randomIndex = Math.floor(Math.random() * count) + 1;
      randomIndexes.add(randomIndex);
    }
    const idsArray = Array.from(randomIndexes);

    const BATCH_SIZE = 10000;
    let updatedCount = 0;

    for (let i = 0; i < idsArray.length; i += BATCH_SIZE) {
      const batch = idsArray.slice(i, i + BATCH_SIZE);

      const result: UpdateResult = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          has_problems: () =>
            'CASE WHEN random() > 0.2 THEN true ELSE false END',
        })
        .where('id IN (:...ids)', { ids: batch })
        .execute();

      updatedCount += result.affected || 0;
    }

    return { updatedCount };
  }
}
