
import { UseGuards, applyDecorators } from "@nestjs/common";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";

export const UseThrottle = (limit: number, ttl: number) => applyDecorators(
  UseGuards(ThrottlerGuard),
  Throttle({ default: { limit, ttl: ttl * 1000 } }),
);