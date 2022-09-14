import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddCategoryIdToProduct1663111840541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'cat_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                name: 'productsCategories',
                columnNames: ['cat_id'],
                referencedTableName: 'categories',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'products',
            'productsCategories',
        );
        await queryRunner.dropColumn('products', 'cat_id');
    }

}
