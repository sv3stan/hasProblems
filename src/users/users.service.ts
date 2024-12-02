import { Injectable } from '@nestjs/common';
//******************** */
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

  // Сброс флага проблем у пользователей
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

    // Сбрасываем флаг проблем
    await this.resetProblems();

    return { count, reset: true };
  }

  async updateRandomProblems(): Promise<{ updatedCount: number }> {
    const users = await this.userRepository.find();

    let updatedCount = 0;

    for (const user of users) {
      const hasProblems = Math.random() > 0.8;
      if (user.has_problems !== hasProblems) {
        user.has_problems = hasProblems;
        await this.userRepository.save(user);
        updatedCount++;
      }
    }

    return { updatedCount };
  }
}
