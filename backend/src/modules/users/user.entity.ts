import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  login: string;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ type: 'binary', length: 60, name: 'password_hash' })
  passwordHash: string;
}
