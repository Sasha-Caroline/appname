import { Entity } from 'src/app/core/models/entity.model';

export interface Projeto extends Entity<number> {
    titulo: string;
}
