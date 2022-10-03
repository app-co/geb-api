import { Like, Post } from '@prisma/client';
import { IPostsDtos } from '@shared/dtos';

export interface IPostsRepository {
   create(data: IPostsDtos, like: number): Promise<Post>;
   findById(id: string): Promise<Post | null>;
   listAllPost(): Promise<Post[]>;
   createLike(user_id: string, fk_id_post: string): Promise<Like>;
   findLikeByUserId(id: string): Promise<Like | null>;
}
