import { Post } from '.prisma/client';

import { IPostsDtos } from '../Dtos/IPostsDtos';

export interface IPostsRepository {
   create(data: IPostsDtos): Promise<Post>;
   findById(id: string): Promise<Post | null>;
   listAllPost(): Promise<Post[]>;
}
