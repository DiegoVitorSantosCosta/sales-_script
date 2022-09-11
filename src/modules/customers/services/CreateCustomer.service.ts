import AppError from '@shared/errors/App.errors';
import Customer from '@shared/infra/typeorm/entities/Custumer';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const customer = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;