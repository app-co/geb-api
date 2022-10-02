/* eslint-disable import/no-extraneous-dependencies */
import { Like, Post, PrismaClient } from '.prisma/client';

import { IPostsDtos } from '@shared/dtos';

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

   async upLike(id: string, like: number): Promise<Like> {
      const prisma = new PrismaClient();

      const lk = await prisma.like.update({
         where: { id },
         data: {
            like,
         },
      });

      return lk;
   }

   async findLikeById(id: string): Promise<Like | null> {
      const prisma = new PrismaClient();
      const like = await prisma.like.findUnique({
         where: { id },
      });

      return like;
   }
}
