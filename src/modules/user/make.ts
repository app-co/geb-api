import RedisCacheProvider from "@/shared/implementations/redis/redis-provider";
import { UserService } from "./service";

export function make() {
  const redis = new RedisCacheProvider()
  const sv = new UserService(redis)

  return sv;
}