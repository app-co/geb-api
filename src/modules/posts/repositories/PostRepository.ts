import { Post, PrismaClient } from '.prisma/client';

import { IPostsDtos } from '../Dtos/IPostsDtos';
import { IPostsRepository } from './IPostRepositoty';

export class PostRepository implements IPostsRepository {
   private prisma() {
      const { post } = new PrismaClient();
      return post;
   }

   async create(data: IPostsDtos): Promise<Post> {
      const { post } = new PrismaClient();

      const create = await post.create({
         data: {
            image: data.image,
            user_id: data.user_id,
            description: data.description,
         },
      });

      return create;
   }

   async findById(id: string): Promise<Post | null> {
      const find = await this.prisma().findUnique({ where: { id } });
      return find;
   }

   async listAllPost(): Promise<Post[]> {
      const { post } = new PrismaClient();

      const find = await post.findMany({
         include: { user: true },
      });
      return find;
   }
}
