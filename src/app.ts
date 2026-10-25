import express from 'express';

import { router } from './routes.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { notFound } from './shared/middlewares/notFound.js';

// CRIAR A APLICAÇÃO EXPRESS \\
const app = express();

// MIDDLEWARES; fazer o express entender corpo de requisição JSON \\
app.use(express.json());
app.use(router);

//⚠️ A ORDEM IMPORTA: O EXPRESS EXECUTA OS MIDDLEWARES DE CIMA PARA BAIXO
app.use(notFound); // DEPOIS DE TODAS AS ROTAS
app.use(errorHandler); // SEMPRE O ULTIMO

export { app };
