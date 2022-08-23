/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { DeleteUserService } from '@modules/users/service/DeleteUserService';
import { SessionService } from '@modules/users/service/SessionService.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateUserService);

      const { nome, membro, senha, adm } = req.body;

      const user = await service.execute({
         nome,
         membro,
         senha,
         adm,
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

   // async update(req: Request, res: Response): Promise<Response> {}

   // async updateAvatar(req: Request, res: Response): Promise<Response> {}

   // async updateLogo(req: Request, res: Response): Promise<Response> {}

   // async findAll(req: Request, res: Response): Promise<Response> {}

   // async findUnicUser(req: Request, res: Response): Promise<Response> {}

   // async updateToken(req: Request, res: Response): Promise<Response> {}

   // async updatePadrinho(req: Request, res: Response): Promise<Response> {}

   // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}

   // async deleteUser(req: Request, res: Response): Promise<Response> {}
}
