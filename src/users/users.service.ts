import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/input/signup.input';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UserService')
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      })
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDbErrors(error)
    }
  }

  async findAll() {
    return [];
  }

  async findOnebyEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
      this.handleDbErrors(error);
    }

  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }


  private handleDbErrors(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException('Check your logs')

  }
}
