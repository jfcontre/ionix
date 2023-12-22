import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);