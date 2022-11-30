import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/input/login.input';
import { SignupInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {

  }

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id })
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput)
    const token = this.getJwtToken(user.id);
    return {
      token,
      user
    }

  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOnebyEmail(loginInput.email)
    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new BadRequestException(`Email or password are wrong`)
    }
    const token = this.getJwtToken(user.id);
    return {
      token,
      user
    }



  }


}
