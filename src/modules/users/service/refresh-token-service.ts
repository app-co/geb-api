import { addDays } from "date-fns";
import { Err } from "@shared/errors/AppError";
import { prisma } from "@utils/prisma";
import dayjs from 'dayjs';

import { tokenProvider } from '../providers/generate-token-provider';

export async function RefreshToken(refresh_token: string): Promise<any> {
   const refresh = await prisma.refreshToken.findFirst({
      where: { userId: refresh_token },
   });

   if (!refresh) {
      throw new Err('refresh-token invalid');
   }

   const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refresh.expiresIn));

   if (refreshTokenExpired) {
      throw new Err('Sua sessão expirou', 401);
   }

   const token = await tokenProvider(refresh.userId);

   const expiresIn = dayjs().add(5, 'day').unix();

   await prisma.refreshToken.update({
      where: { id: refresh.id },
      data: {
         expiresIn,
      },
   });
   return { token };
}
