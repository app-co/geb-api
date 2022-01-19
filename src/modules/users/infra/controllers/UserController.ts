/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { DeleteUserService } from '@modules/users/service/DeleteUserService.service';
import { FindUniqUser } from '@modules/users/service/FindUniqUser.service';
import { ListAllUserService } from '@modules/users/service/ListAllUsersService.service';
import { SessionService } from '@modules/users/service/SessionService.service';
import { UpdateSenhaUserService } from '@modules/users/service/UdateSenhaUserService';
import { UpdateLogoService } from '@modules/users/service/UpdateLogoService.service';
import { UpdatePadrinhoService } from '@modules/users/service/UpdatePadrinhoService';
import { UpdateProfileService } from '@modules/users/service/UpdateProfileService.service';
import { UpdateUserAvatarService } from '@modules/users/service/UpdateUserAvatarService.service';
import { Request, Response } from 'express';
import fs from 'fs';
import { container } from 'tsyringe';

import { UpdateUserTokenService } from '../../service/UpdateUserTokenService.service';

export class UserController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateUserService);

      const {
         nome,
         membro,
         senha,
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         ramo,
         enquadramento,
         adm,
      } = req.body;

      const user = await service.execute({
         nome,
         membro,
         senha,
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         ramo,
         enquadramento,
         adm,
      });

      return res.json(user);
   }

   async update(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateProfileService);

      const {
         nome,
         membro,
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         links,
         ramo,
         enquadramento,
         adm,
      } = req.body;

      const { id } = req.user;

      const user = await service.execute({
         nome,
         membro,
         whats,
         workName,
         CNPJ,
         CPF,
         ramo,
         email,
         links,
         enquadramento,
         adm,
         id,
      });

      return res.json(user);
   }

   async updateAvatar(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateUserAvatarService);

      const user_id = req.user.id;
      const avatar = req.file!.filename;

      // fs.unlinkSync(req.file!.path);

      const update = await service.execute({ user_id, avatar });

      return res.json(update);
   }

   async updateLogo(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateLogoService);

      const user_id = req.user.id;
      const logo = req.file!.filename;

      // fs.unlinkSync(req.file!.path);

      const update = await service.execute({ user_id, logo });

      return res.json(update);
   }

   async findAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllUserService);
      const user = await service.execute();

      return res.json(user);
   }

   async session(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(SessionService);
      const { membro, senha } = req.body;

      const user = await service.execute({ membro, senha });

      return res.json(user);
   }

   async delete(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteUserService);

      const { membro } = req.body;
      const user = await service.execute(membro);

      return res.json(user);
   }

   async findUnicUser(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindUniqUser);

      const { id } = req.query;
      const user = await service.execute({ id: String(id) });

      return res.json(user);
   }

   async updateToken(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateUserTokenService);
      const { token } = req.body;
      const { id } = req.user;
      const up = await service.execute({ token, id });

      return res.json(up);
   }

   async updatePadrinho(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdatePadrinhoService);

      const { user_id } = req.body;
      const user = await service.execute({ user_id });

      return res.json(user);
   }

   async updateSenhaUser(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateSenhaUserService);
      const { senha, id } = req.body;
      const up = await service.execute({ senha, id });

      return res.json(up);
   }

   async deleteUser(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteUserService);
      const { user_id } = req.body;
      const up = await service.execute(user_id);

      return res.json(up);
   }
}
