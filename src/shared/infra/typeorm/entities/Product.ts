import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import OrdersProducts from "./OrdersProducts";
import { Category } from './Category';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products: OrdersProducts[];

    @Column('varchar')
    cat_id: string

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}