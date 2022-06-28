import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255, unique: true })
  public login: string;

  @Column({ length: 320, unique: true })
  public email: string;

  @Column({ type: 'binary', length: 60, name: 'password_hash' })
  private _passwordHash: Buffer;

  public set passwordHash(passwordHash: string) {
    this._passwordHash = Buffer.from(passwordHash);
  }

  public get passwordHash(): string {
    return this._passwordHash.toString();
  }

  @Column({ name: 'created_at', readonly: true })
  public readonly createdAt: Date;

  @Column({ type: 'datetime', nullable: true, name: 'last_auth_at' })
  public lastAuthAt: Date | null;

  @Column({ type: 'datetime', nullable: true, name: 'email_verified_at' })
  public emailVerifiedAt: Date | null;

  public get emailVerified(): boolean {
    return !!this.emailVerifiedAt;
  }

  @Column({ type: 'varchar', length: 8, nullable: true, unique: true, name: 'email_verification_key' })
  public emailVerificationKey: string | null;

  @Column({ type: 'datetime', nullable: true, name: 'email_verification_key_generated_at' })
  public emailVerificationKeyGeneratedAt: Date | null;

  @Column({ type: 'varchar', length: 8, nullable: true, unique: true, name: 'password_reset_key' })
  public passwordResetKey: string | null;

  @Column({ type: 'datetime', nullable: true, name: 'password_reset_key_generated_at' })
  public passwordResetKeyGeneratedAt: Date | null;

  public toResponseObject(): Partial<User> {
    return {
      id: this.id,
      login: this.login,
      email: this.email,
      createdAt: this.createdAt,
      lastAuthAt: this.lastAuthAt,
      emailVerified: this.emailVerified
    };
  }
}
