import { app } from './app';
import { env } from './config/env';

// INICIAR O SERVIDOR \\
app.listen(env.PORT, () => {
    console.log(`🚀 http://localhost:${env.PORT} [${env.NODE_ENV}]`);
});
