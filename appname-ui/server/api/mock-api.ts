import { Request, Response } from 'express';
import { ResultList } from '../util/result-list';

// const DATA = TOPICOS;

// export var nextId = Object.keys(DATA)?.length + 1;

export function getAllEntities(req: Request, res: Response, data: any) {
    console.log('[GET] ' + req.url);

    setTimeout(() => {
        res.status(200).json({ content: Object.values(data) } as ResultList<any>);
    }, 500);
}

export function getEntityById(req: Request, res: Response, data: any) {
    console.log('[GET] ' + req.url);
    const id = req.params['id'];
    console.log(id);

    const dataValue: any = Object.values(data);

    const entity = dataValue.find((e: any) => e.id == id);

    setTimeout(() => {
        res.status(200).json(entity);
    }, 500);
}

export function createEntity(req: Request, res: Response, data: any) {
    console.log('[POST] ' + req.url);

    const changes = req.body;

    const nextId = Object.keys(data)?.length + 1;

    const newEntity = {
        id: nextId,
        ...changes,
    };

    data[newEntity.id] = newEntity;

    setTimeout(() => {
        res.status(200).json(newEntity);
    }, 500);
}

export function updateEntity(req: Request, res: Response, data: any) {
    console.log('[PUT] ' + req.url);

    const id = req.params['id'],
        changes = req.body;

    data[id] = {
        ...data[id],
        ...changes,
    };

    setTimeout(() => {
        res.status(200).json(data[id]);
    }, 500);
}

export function deleteEntity(req: Request, res: Response, data: any) {
    console.log('[DELETE] ' + req.url);

    const id = req.params['id'];

    const entity = data[id];

    delete data[id];

    setTimeout(() => {
        res.status(200).json({ id });
    }, 500);
}
