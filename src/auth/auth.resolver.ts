import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service';
import { LoginInput } from './dto/input/login.input';
import { SignupInput } from './dto/input/signup.input';
import { JwtAuthGuard } from './guards/jwt.-auth.guard';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse, { name: 'signup' })
  signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signup(signupInput)
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput)
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken() {
    return
  }

}
