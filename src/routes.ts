import { Router } from 'express';

import { barbersRoutes } from './modules/barbers/barbers.routes.js';
import { servicesRoutes } from './modules/services/services.routes.js';

const router = Router();

router.get('health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/services', servicesRoutes);
router.use('/barbers', barbersRoutes); //

export { router };
