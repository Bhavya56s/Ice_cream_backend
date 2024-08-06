import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Profiles } from 'src/profile/entities/profile.entity';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    
    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const profile = request.profile as Profiles

    if (profile.role !== 'admin') {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
