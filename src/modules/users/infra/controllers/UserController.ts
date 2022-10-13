/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateLink } from '@modules/users/service/createLink';
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { DeleteUserService } from '@modules/users/service/DeleteUserService';
import { findUserByIdService } from '@modules/users/service/findUserByIdService';
import { ListAllUser } from '@modules/users/service/ListAllUsers';
import { CreatePadrinhoService } from '@modules/users/service/Padrinho/createPadrinhoService';
import { GlobalPontsService } from '@modules/users/service/Pontos/GlobalPontsService';
import { IndicifualPontsService } from '@modules/users/service/Pontos/IndividualPontsService';
import { CreateProfi } from '@modules/users/service/Profile/CreateProfile';
import { UpdateProfileService } from '@modules/users/service/Profile/UpdateProfileService';
import { SessionService } from '@modules/users/service/SessionService.service';
import { UpdateSenha } from '@modules/users/service/UpdatePass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateUserService);

      const {
         nome,
         qntIndication,
         qntPadrinho,
         membro,
         senha,
         adm,
         id,
         apadrinhado,
         firstLogin,
         inativo,
      } = req.body;

      const user = await service.execute({
         nome,
         membro,
         senha,
         adm,
         id,
         apadrinhado,
         firstLogin,
         inativo,
         qntIndication,
         qntPadrinho,
      });

      return res.json(user);
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

   // async updateAvatar(req: Request, res: Response): Promise<Response> {}

   // async updateLogo(req: Request, res: Response): Promise<Response> {}

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllUser);

      const list = await service.execute();

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
      const serv = container.resolve(GlobalPontsService);

      const ex = await serv.execute();

      return res.json(ex);
   }

   async rankIndividual(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(IndicifualPontsService);

      const user_id = req.user.id;
      const ex = await serv.execute(user_id);

      return res.json(ex);
   }

   //! ! PADRINNHO

   async createPadrinho(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(CreatePadrinhoService);
      const { apadrinhado_name, apadrinhado_id, qnt } = req.body;

      const user_id = req.user.id;
      const ex = await serv.execute({
         user_id,
         apadrinhado_name,
         apadrinhado_id,
         qnt,
      });

      return res.json(ex);
   }

   // async findUnicUser(req: Request, res: Response): Promise<Response> {}

   // async updateToken(req: Request, res: Response): Promise<Response> {}

   // async updatePadrinho(req: Request, res: Response): Promise<Response> {}

   // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}
}
