import { AppError } from './AppError.js';

// HERANÇA: UM NOTFOUNDERROR É UM APPERROR SÓ QUE SEMPRE
// COM STATUS 404

export class NotFoundError extends AppError {
    constructor(resource = 'Recursos') {
        super(`${resource} não encontrado`, 404);
        this.name = 'NotFoundError';
    }
}
