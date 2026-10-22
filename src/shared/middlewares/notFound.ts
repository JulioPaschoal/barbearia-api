import { RequestHandler } from 'express';

// SE A REQUISIÇÃO CHEGOU ATÉ AQUI NENHUMA ROTA CORRESPONDEU
export const notFound: RequestHandler = (req, res) => {
    res.status(404).json({
        message: `Rota ${req.method} ${req.originalUrl} não existe`,
    });
};
