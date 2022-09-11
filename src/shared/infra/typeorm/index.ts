import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "diego",
    password: "vitor123123",
    database: "apiVendas",
    // synchronize: true,
    // logging: true,
    entities: [
        "./src/shared/infra/typeorm/entities/*.ts"
    ],
    // subscribers: [],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],

})