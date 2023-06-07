import { Entity } from 'src/app/core/models/entity.model';

export interface Servidor extends Entity<number> {
    matricula: string;
    nome: string;
    email: string;
    cpf: string;

    codigoLotacao: number;
    siglaLotacao: string;
    descricaoLotacao: string;

    cargo: string;
    funcao: string;

    foto: string; //base64 //
}
