import { RelationShip } from '@prisma/client';

import { IRelationship, IRelationshipUpdate } from '../dtos';

export interface IRepoRelationship {
   create(data: IRelationship): Promise<RelationShip>;
   delete(id: string): Promise<void>;
   update(data: IRelationshipUpdate): Promise<RelationShip>;
   listAll(): Promise<RelationShip[]>;
   listByClient(client_id: string): Promise<RelationShip[]>;
   listByPrestador(prestador_id: string): Promise<RelationShip[]>;
   listValidated(): Promise<RelationShip[]>;
   listPending(): Promise<RelationShip[]>;
   findById(id: string): Promise<RelationShip | null>;
}
