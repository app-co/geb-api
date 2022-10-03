/* eslint-disable import/no-extraneous-dependencies */
import { IPostsDtos } from '@shared/dtos';

import { Like, Post, PrismaClient } from '.prisma/client';

import { IPostsRepository } from './IPostRepositoty';

export class PostRepository implements IPostsRepository {
   private prisma() {
      const { post } = new PrismaClient();
      return post;
   }

   async create(data: IPostsDtos, like: number): Promise<Post> {
      const { post } = new PrismaClient();

      const create = await post.create({
         data: {
            image: data.image,
            description: data.description,
            fk_id_user: data.fk_id_user,
            like: {
               create: {
                  like,
                  user_id: data.fk_id_user,
               },
            },
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
         include: {
            like: true,
         },
      });
      return find;
   }

   async createLike(user_id: string, fk_id_post: string): Promise<Like> {
      const prisma = new PrismaClient();

      const lk = await prisma.like.create({
         data: {
            user_id,
            fk_id_post,
         },
      });

      return lk;
   }

   async findLikeByUserId(id: string): Promise<Like | null> {
      const prisma = new PrismaClient();
      const like = await prisma.like.findFirst({
         where: { user_id: id },
      });

      return like;
   }
}
