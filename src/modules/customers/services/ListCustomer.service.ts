import Customer from '@shared/infra/typeorm/entities/Custumer';
import { customersRepository } from '@shared/infra/typeorm/repositories/Custumer.repository';


class ListCustomerService {
    public async execute(): Promise<Customer[]> {

        const customers = customersRepository.find();

        return customers;
    }
}

export default ListCustomerService;