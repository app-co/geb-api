import { RelationShip } from '@prisma/client';

import { IRelashionship, IRelashionshipUpdate } from '../dtos';

export interface IRepoRelationship {
   create(data: IRelashionship): Promise<RelationShip>;
   delete(id: string): Promise<void>;
   update(data: IRelashionshipUpdate): Promise<RelationShip>;
   listAll(): Promise<RelationShip[]>;
   listByMembro(membro: string): Promise<RelationShip[]>;
   listByUserId(fk_user_id: string): Promise<RelationShip[]>;
   findById(id: string): Promise<RelationShip | null>;
}
