import { app } from './app.js';
import { env } from './config/env.js';

// INICIAR O SERVIDOR \\
app.listen(env.PORT, () => {
    console.log(`🚀 http://localhost:${env.PORT} [${env.NODE_ENV}]`);
});
