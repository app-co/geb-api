export interface IUserDtos {
   id?: string;
   nome: string;
   membro: string;
   senha: string;
   adm: boolean;
   token?: string;
}

export interface IProfileDto {
   user_id: string;
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   ramo: string;
   enquadramento: string;
   email: string;
   links?: [];
}

export interface IPresencaDto {
   id?: string;
   nome: string;
   user_id: string;
   createdAt?: Date;
}

export interface IOrderTransaction {
   id?: string;
   consumidor_name: string;
   prestador_name: string;
   consumidor_id: string;

   prestador_id: string;
   valor: number;
   descricao: string;
   createdAt?: Date;
}

export interface IB2b {
   send_id: string;
   send_name: string;
   recevid_name: string;
   recevid_id: string;
   appointment: string;
   createdAt?: Date;
   validate?: boolean;
}

export interface IIndicationDto {
   id?: string;
   indicado_id: string;
   indicado_name: string;
   quemIndicou_id: string;
   quemIndicou_name: string;
   client_name: string;
   phone_number_client: number;
   description: string;
   validate?: boolean;
}
