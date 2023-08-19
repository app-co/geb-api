import { sign } from "jsonwebtoken";
import auth from "@config/auth";

export async function tokenProvider(userId: string): Promise<any> {
   const { secret, expiresIn } = auth.jwt;

   const token = sign({}, secret, {
      subject: userId,
      expiresIn,
   });

   return token;
}
