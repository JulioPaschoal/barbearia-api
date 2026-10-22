import express from 'express';
import { z } from 'zod';

import { AppError } from './shared/errors/AppError.js';
import { NotFoundError } from './shared/errors/NotFoundError.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { notFound } from './shared/middlewares/notFound.js';

// CRIAR A APLICAÇÃO EXPRESS \\
const app = express();

// MIDDLEWARES; fazer o express entender corpo de requisição JSON \\
app.use(express.json());

//
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/teste/app-error', () => {
    throw new AppError('Horário indisponível', 409);
});

app.get('/teConflictError', () => {
    throw new AppError('Horário já ocupado', 409);
});

app.get('/teste/not-found', () => {
    throw new NotFoundError('Barbeiro');
});

app.get('/teste/bug', () => {
    throw new Error('Algo quebrou de verdade');
});

app.post('/teste/validacao', (req, res) => {
    const schema = z.object({
        name: z.string().min(3, 'O nome precisa ter ao menos 3 letras'),
        price: z.number().positive('O preço precisa ser positivo'),
    });
    const data = schema.parse(req.body); // Se for inválido, lança ZodError
    res.json(data);
});

//⚠️ A ORDEM IMPORTA: O EXPRESS EXECUTA OS MIDDLEWARES DE CIMA PARA BAIXO
app.use(notFound); // DEPOIS DE TODAS AS ROTAS
app.use(errorHandler); // SEMPRE O ULTIMO

export { app };
