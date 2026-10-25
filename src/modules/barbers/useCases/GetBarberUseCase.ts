import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import type { Barber } from '../entities/Barber.js';
import type { IBarbersRepository } from '../repositories/IBarbersRepository.js';

export class GetBarberUseCase {
    constructor(private barbersRepository: IBarbersRepository) {}

    async execute(id: string): Promise<Barber> {
        const barber = await this.barbersRepository.findById(id);

        // O repository devolve null; quem decide que isso é um ERRO é o use case
        if (!barber) {
            throw new NotFoundError('Barbeiro');
        }

        return barber; // aqui o TypeScript já sabe que é Barber, e não Barber | null
    }
}
