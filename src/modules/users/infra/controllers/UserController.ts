/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { clearCacheService } from '@modules/users/service/clearCacheService';
import { CreateLink } from '@modules/users/service/createLink';
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { DeleteUserService } from '@modules/users/service/DeleteUserService';
import { makeUser } from '@modules/users/service/factories/make-user';
import { findUserByIdService } from '@modules/users/service/findUserByIdService';
import { ListAllUser } from '@modules/users/service/ListAllUsers';
import { CreateProfi } from '@modules/users/service/Profile/CreateProfile';
import { UpdateLogo } from '@modules/users/service/Profile/UpdateLogo';
import { UpdateProfileService } from '@modules/users/service/Profile/UpdateProfileService';
import { RefreshToken } from '@modules/users/service/refresh-token-service';
import { SessionService } from '@modules/users/service/SessionService.service';
import { UpdateMembroService } from '@modules/users/service/UpdateMembroService';
import { UpdateSenha } from '@modules/users/service/UpdatePass';
import { HUB } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAvatar } from '../../service/Profile/UpdateAvatar';

export class UserController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateUserService);

      const {
         nome,
         membro,
         senha,
         adm,
         apadrinhado,
         firstLogin,
         inativo,
         hub,
      } = req.body;

      const user = await service.execute({
         nome,
         membro,
         senha,
         adm,
         apadrinhado,
         firstLogin,
         inativo,
         hub,
      });

      return res.json(user);
   }

   async updateMembro(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdateMembroService);

      const { membro, nome, senha, token, id, adm } = req.body;

      const sess = await service.execute({
         membro,
         senha,
         nome,
         id,
         adm,
         token,
      });

      return res.json(sess);
   }

   async session(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(SessionService);

      const { membro, senha } = req.body;

      const sess = await service.execute({
         membro,
         senha,
      });

      return res.json(sess);
   }

   async deleteUser(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(DeleteUserService);
      const { membro } = req.params;

      const rs = await serv.execute({ membro });

      return res.json(rs);
   }

   async findUserById(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(findUserByIdService);
      const { id } = req.user;

      const rs = await serv.execute({ user_id: id });

      return res.json(rs);
   }

   async updateSenha(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateSenha);

      const { membro, senha } = req.body;

      const rs = await serv.execute({ membro, senha });

      return res.json(rs);
   }

   async refreshToken(req: Request, res: Response): Promise<Response> {
      const { refresh_token } = req.body;

      const token = await RefreshToken(refresh_token);

      return res.json(token);
   }

   // async updateAvatar(req: Request, res: Response): Promise<Response> {}

   // async updateLogo(req: Request, res: Response): Promise<Response> {}

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllUser);
      const { hub } = req.params;

      console.log(hub);

      const list = await service.execute({ hub: String(hub) as HUB });

      return res.json(list);
   }

   // ! PROFILE */
   async createProfile(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(CreateProfi);
      const {
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         enquadramento,
         ramo,
         logo,
         avatar,
         fk_id_user,
      } = req.body;

      // const user_id = req.user.id;

      const create = await serv.execute({
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         enquadramento,
         ramo,
         fk_id_user,
         logo,
         avatar,
      });

      return res.json(create);
   }

   async updateProfile(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateProfileService);
      const {
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         enquadramento,
         ramo,
         logo,
         avatar,
         fk_id_user,
      } = req.body;

      // const user_id = req.user.id;

      const create = await serv.execute({
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         enquadramento,
         ramo,
         fk_id_user,
         logo,
         avatar,
      });

      return res.json(create);
   }

   async updateAvatar(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateAvatar);
      const avatar = req.file!.filename;

      const { id } = req.user;

      const create = await serv.execute(id, avatar);

      return res.json(create);
   }

   async updateLogo(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateLogo);
      const logo = req.file!.filename;

      const { id } = req.user;

      const create = await serv.execute(id, logo);

      return res.json(create);
   }

   // !! LINKS

   async createLink(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateLink);

      const { nome, user_id, link } = req.body;

      const user = await service.execute({
         nome,
         user_id,
         link,
      });

      return res.json(user);
   }

   //! pntos

   async rank(req: Request, res: Response): Promise<Response> {
      const serv = makeUser();

      const ex = await serv.globalPonts.execute();

      return res.json(ex);
   }

   async rankIndividual(req: Request, res: Response): Promise<Response> {
      const serv = makeUser();

      const user_id = req.user.id;
      const ex = await serv.selfPonts.execute(user_id);

      return res.json(ex);
   }

   //! ! PADRINNHO

   async clearCash(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(clearCacheService);

      const rs = await service.execute();

      return res.json(rs);
   }

   // async updateToken(req: Request, res: Response): Promise<Response> {}

   // async updatePadrinho(req: Request, res: Response): Promise<Response> {}

   // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}
}
