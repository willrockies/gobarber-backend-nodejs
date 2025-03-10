import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Migrations1709584240542 implements MigrationInterface {
    name = 'Migrations1709584240542'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'users', new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'avatar');
    }

}
