import RedisCacheProvider from "@/shared/implementations/redis/redis-provider";
import { UserService } from "../user/service";
import { RelationshipService } from "./service";

export function make() {
  const redis = new RedisCacheProvider()
  const user = new UserService(redis)

  const sv = new RelationshipService(redis, user)
  return sv;
}