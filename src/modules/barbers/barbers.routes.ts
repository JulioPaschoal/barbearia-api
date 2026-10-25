import { Router } from 'express';

import { makeBarbersController } from './barbers.factory.js';

const barbersRoutes = Router();
const controller = makeBarbersController();

barbersRoutes.post('/', controller.create);
barbersRoutes.get('/', controller.list);
barbersRoutes.get('/:id', controller.show);
barbersRoutes.patch('/:id', controller.update);
barbersRoutes.delete('/:id', controller.deactivate);

export { barbersRoutes };
