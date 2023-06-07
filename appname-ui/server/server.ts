import * as express from 'express';
import { Application } from 'express';
import { createEntity, deleteEntity, getAllEntities, getEntityById, updateEntity } from './api/mock-api';
import { PROJETOS } from './data/projetos';

const bodyParser = require('body-parser');

const app: Application = express();
const cors = require('cors');
app.use(cors({ origin: true }));
app.use(bodyParser.json());

//PROJETOS
app.route('/api/projeto').get((req, res) => getAllEntities(req, res, PROJETOS));
app.route('/api/projeto/:id').get((req, res) => getEntityById(req, res, PROJETOS));
app.route('/api/projeto').post((req, res) => createEntity(req, res, PROJETOS));
app.route('/api/projeto/:id').put((req, res) => updateEntity(req, res, PROJETOS));
app.route('/api/projeto/:id').delete((req, res) => deleteEntity(req, res, PROJETOS));

const httpServer: any = app.listen(8080, () => {
    console.log('MOCK API Server running at http://localhost:' + httpServer.address().port);
});
