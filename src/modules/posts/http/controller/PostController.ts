/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreatePostService } from '@modules/posts/service/CreatePostService';
import { LikeService } from '@modules/posts/service/LikeService';
import { ListAllPost } from '@modules/posts/service/ListAllPostService.service';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { container } from 'tsyringe';

export class PostController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreatePostService);

      const post = req.file!.filename;
      // return res.json(req.file);

      // await sharp(req.file?.path)
      //    .resize(500)
      //    .jpeg({ quality: 70 })
      //    .toFile(path.resolve(req.file!.destination, 'post', post));

      const po = await service.execute({ post });

      return res.json(po);
   }

   async like(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(LikeService);

      const { image_id } = req.params;

      const like = await service.execute(image_id);

      req.io.emit('like', like);

      return res.json(like);
   }

   async listAllPosts(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllPost);
      const post = await service.execute();

      return res.json(post);
   }
}
