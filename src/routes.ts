import { Router } from 'express';

import { servicesRoutes } from './modules/services/services.routes.js';

const router = Router();

router.get('health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/services', servicesRoutes);

export { router };
