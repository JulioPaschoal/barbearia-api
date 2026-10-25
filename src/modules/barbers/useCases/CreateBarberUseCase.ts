import { ConflictError } from '../../../shared/errors/ConflictError.js';
import type { Barber } from '../entities/Barber.js';
import type { IBarbersRepository } from '../repositories/IBarbersRepository.js';
import type { CreateBarberDTO } from '../schemas/barber.schemas.js';

export class CreateBarberUseCase {
    constructor(private barbersRepository: IBarbersRepository) {}

    async execute(data: CreateBarberDTO): Promise<Barber> {
        // REGRA: não podem existir dois barbeiros com o mesmo e-mail
        const emailInUse = await this.barbersRepository.findByEmail(data.email);

        if (emailInUse) {
            throw new ConflictError('Este e-mail já está em uso');
        }

        return this.barbersRepository.create(data);
    }
}
