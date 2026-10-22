import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { env } from '../../config/env.js';
import { AppError } from '../errors/AppError.js';

// EXPRESS RECONHECE UM MIDDLAWARE DE ERRO POR ELE TER 4 PARÂMETROS
// POR ISSO O _REQ E O _NEXT PRECISA EXISTIR MESM SEM USO

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    // 1. ERRO QUE NÓS MESMOS LANÇAMOS
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    // 2. ERROS DE VALIDAÇÃO DO ZOD: DADOS ENVIADOS PELO CLIENTE SÃO INVÁLIDOS
    if (err instanceof ZodError) {
        res.status(400).json({
            message: 'Erro de validação',
            issues: err.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        });
        return;
    }

    // 3. QUALQUER OUTRA COISA É UM BUG: LOGA E NÃO ESPÕE DETALHES AO CLIENTE
    console.error(err);
    res.status(500).json({
        message: 'Erro interno do servidor',
        //EM  DESENVOLVIMENTO  MOSTRAR O ERRO AJUDA A DEBUGAR
        ...(env.NODE_ENV === 'development' && { error: String(err) }),
    });
};
