import AppError from '@shared/errors/App.errors';
import User from '@shared/infra/typeorm/entities/User';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<any> {

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists && email !== customer.email) {
            throw new AppError('There is already one customer with this email.');
        }

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;