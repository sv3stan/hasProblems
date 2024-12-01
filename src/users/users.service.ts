import { Injectable } from '@nestjs/common';
//******************** */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';





@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async resetProblems(): Promise<{ updatedCount: number }> {
    const count = await this.userRepository.count({
      where: { hasProblems: true },
    });
    await this.userRepository.update({}, { hasProblems: false });
    return { updatedCount: count };
  }
}