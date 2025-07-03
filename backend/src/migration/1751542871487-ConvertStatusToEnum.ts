import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertStatusToEnum1680000000002 implements MigrationInterface {
  name = 'ConvertStatusToEnum1680000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users 
      RENAME COLUMN status TO old_status;
    `);

    await queryRunner.query(`
      ALTER TABLE users 
      ADD COLUMN status TEXT DEFAULT 'enabled';
    `);

    await queryRunner.query(`
      UPDATE users
      SET status = CASE
        WHEN old_status = 0 THEN 'disabled'
        WHEN old_status = 1 THEN 'enabled'
        ELSE 'deleted'
      END;
    `);

    await queryRunner.query(`ALTER TABLE users DROP COLUMN old_status`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN old_status INTEGER;
    `);

    await queryRunner.query(`
      UPDATE users
      SET old_status = CASE
        WHEN status = 'enabled' THEN 1
        WHEN status = 'disabled' THEN 0
        ELSE NULL
      END;
    `);

    await queryRunner.query(`
      ALTER TABLE users DROP COLUMN status;
    `);

    await queryRunner.query(`
      ALTER TABLE users RENAME COLUMN old_status TO status;
    `);
  }
}
