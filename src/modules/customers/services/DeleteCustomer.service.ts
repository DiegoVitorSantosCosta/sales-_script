import AppError from '@shared/errors/App.errors';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await customersRepository.remove(customer);
    }
}

export default DeleteCustomerService;