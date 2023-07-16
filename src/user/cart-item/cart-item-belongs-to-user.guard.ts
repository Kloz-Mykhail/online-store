import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PrismaService } from 'src/db/prisma.service';
import { Request } from 'express';
@Injectable()
export class CartItemBelongsToUserGuard extends AuthGuard {
  constructor(
    private readonly prisma: PrismaService,
    jwtService: JwtService,
    configService: ConfigService,
  ) {
    super(jwtService, configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(context);
    if (!res) return false;
    const request = context.switchToHttp().getRequest<Request>();
    const item = this.isUserWithId(request['user'])
      ? await this.prisma.cartItem.findFirst({
          where: {
            id: +request.params['id'],
            user: { id: request['user'].id },
          },
        })
      : null;
    if (!item) throw new BadRequestException('Item does not exist');

    return true;
  }
  private isUserWithId(user: unknown): user is { id: number } {
    return (
      user &&
      typeof user === 'object' &&
      'id' in user &&
      typeof user.id === 'number'
    );
  }
}