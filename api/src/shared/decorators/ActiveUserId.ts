import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException('Not authorized');
    }

    return userId;
  },
);
