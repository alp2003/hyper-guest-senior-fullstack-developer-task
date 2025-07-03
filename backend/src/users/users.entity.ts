import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Deleted = 'deleted',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'simple-json', default: 'User' }) // now fixed to multiple roles
  roles: string[];

  @Column({ type: 'text', default: UserStatus.Enabled })
  status: UserStatus;
}
