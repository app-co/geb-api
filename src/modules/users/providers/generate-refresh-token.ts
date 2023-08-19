import { prisma } from '@utils/prisma';
import dayjs from 'dayjs'


export class GenerateRefreshToken {
   async execute(userId: string): Promise<any> {
      const expiresIn = dayjs().add(5, 'day').unix();

      const genarateRefreshToken = await prisma.refreshToken.create({
         data: {
            userId,
            expiresIn,
         },
      });

      return genarateRefreshToken;
   }

   async update(userId: string): Promise<any> {
      const expiresIn = dayjs().add(5, 'day').unix();

      const genarateRefreshToken = await prisma.refreshToken.update({
         where: { userId },
         data: {
            userId,
            expiresIn,
         },
      });

      return genarateRefreshToken;
   }
}
