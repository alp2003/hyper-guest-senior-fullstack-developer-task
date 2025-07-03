import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRoleToRoles1680000000001 implements MigrationInterface {
  name = 'RenameRoleToRoles1680000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename column from role → roles
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN role TO roles`);

    // Convert string role values into JSON arrays
    await queryRunner.query(`
      UPDATE users
      SET roles = 
        CASE
          WHEN roles IS NOT NULL THEN json('["' || roles || '"]')
          ELSE json('["User"]')
        END
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Convert JSON array back to string
    await queryRunner.query(`
      UPDATE users
      SET roles = json_extract(roles, '$[0]')
    `);

    // Rename roles back to role
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN roles TO role`);
  }
}
