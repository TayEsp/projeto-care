import {
  Body,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    @Body() email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.user({ email: email });
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    const comparePass = await bcrypt.compare(pass, user?.senha);
    if (!comparePass) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { sub: user.id, username: user.nome };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
