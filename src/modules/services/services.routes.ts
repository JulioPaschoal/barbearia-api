import { Router } from 'express';

import { makeServicesController } from './services.factory.js';

const servicesRoutes = Router();
const controller = makeServicesController();

servicesRoutes.post('/', controller.create);
servicesRoutes.get('/', controller.list);
servicesRoutes.get('/:id', controller.show);
servicesRoutes.patch('/:id', controller.update);
servicesRoutes.delete('/:id', controller.remove);

export { servicesRoutes };
