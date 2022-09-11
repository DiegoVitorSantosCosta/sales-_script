import AppError from '@shared/errors/App.errors';
import Customer from '@shared/infra/typeorm/entities/Custumer';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';


interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;