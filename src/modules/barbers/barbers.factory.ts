import { BarbersController } from './BarbersController.js';
import { InMemoryBarbersRepository } from './repositories/in-memory/InMemoryBarbersRepository.js';
import { CreateBarberUseCase } from './useCases/CreateBarberUseCase.js';
import { DeactivateBarberUseCase } from './useCases/DeactivateBarberUseCase.js';
import { GetBarberUseCase } from './useCases/GetBarberUseCase.js';
import { ListBarbersUseCase } from './useCases/ListBarbersUseCase.js';
import { UpdateBarberUseCase } from './useCases/UpdateBarberUseCase.js';

export function makeBarbersController() {
    // Uma única instância, compartilhada por todos os use cases
    const barbersRepository = new InMemoryBarbersRepository();

    return new BarbersController(
        new CreateBarberUseCase(barbersRepository),
        new ListBarbersUseCase(barbersRepository),
        new GetBarberUseCase(barbersRepository),
        new UpdateBarberUseCase(barbersRepository),
        new DeactivateBarberUseCase(barbersRepository),
    );
}
