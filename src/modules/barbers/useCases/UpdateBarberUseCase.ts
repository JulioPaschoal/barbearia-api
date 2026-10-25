import { AppError } from '../../../shared/errors/AppError.js';
import { ConflictError } from '../../../shared/errors/ConflictError.js';
import { NotFoundError } from '../../../shared/errors/NotFoundError.js';
import { timeToMinutes } from '../../../shared/utils/time.js';
import type { Barber } from '../entities/Barber.js';
import type { IBarbersRepository } from '../repositories/IBarbersRepository.js';
import type { UpdateBarberDTO } from '../schemas/barber.schemas.js';

export class UpdateBarberUseCase {
    constructor(private barbersRepository: IBarbersRepository) {}

    async execute(id: string, data: UpdateBarberDTO): Promise<Barber> {
        const barber = await this.barbersRepository.findById(id);

        if (!barber) {
            throw new NotFoundError('Barbeiro');
        }

        if (data.email) {
            const sameEmail = await this.barbersRepository.findByEmail(
                data.email,
            );

            if (sameEmail && sameEmail.id !== id) {
                throw new ConflictError('Este e-mail já está em uso');
            }
        }

        // O "?? barber.x" usa o valor NOVO se ele veio; senão, usa o que já está salvo
        const startTime = data.startTime ?? barber.startTime;
        const endTime = data.endTime ?? barber.endTime;

        if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
            throw new AppError(
                'O horário de início deve ser antes do horário de fim',
            );
        }

        return this.barbersRepository.update(id, data);
    }
}
