import { Like, Post } from '@prisma/client';
import { IPostsDtos } from '@shared/dtos';

export interface IPostsRepository {
   create(data: IPostsDtos, like: number): Promise<Post>;
   findById(id: string): Promise<Post | null>;
   listAllPost(): Promise<Post[]>;
   upLike(id: string, like: number): Promise<Like>;
   findLikeById(id: string): Promise<Like | null>;
}
