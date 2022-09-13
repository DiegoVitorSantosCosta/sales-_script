import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategory1663028380816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: 'categorys',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,

                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
