import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import type { IBarbersRepository } from '../repositories/IBarbersRepository.js';

// SOFT DELETE: em vez de apagar, marcamos como inativo.
// Motivo: na Parte 6, os agendamentos vão apontar para o barbeiro.
// Se ele for apagado, o histórico ("quem cortou meu cabelo em março?") se perde.
export class DeactivateBarberUseCase {
    constructor(private barbersRepository: IBarbersRepository) {}

    async execute(id: string): Promise<void> {
        const barber = await this.barbersRepository.findById(id);

        if (!barber) {
            throw new NotFoundError('Barbeiro');
        }

        await this.barbersRepository.update(id, { active: false });
    }
}
