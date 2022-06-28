import { Not } from 'typeorm';

import { comparePasswords, hashPassword } from '../../lib/passwords';
import { database } from '../database/database';
import { User } from './user.entity';

const userRepository = database.getRepository(User);

export abstract class UserRepository {
  public static async list(): Promise<User[]> {
    return await userRepository.find({ order: { login: 'asc' } });
  }

  public static async loginExists(login: string, excludeId?: string): Promise<boolean> {
    return !!(await userRepository.findOne({ where: { login, ...(excludeId ? { id: Not(excludeId) } : {}) } }));
  }

  public static async emailExists(email: string, excludeId?: string): Promise<boolean> {
    return !!(await userRepository.findOne({ where: { email, ...(excludeId ? { id: Not(excludeId) } : {}) } }));
  }

  public static async getById(id: string): Promise<User | null> {
    return userRepository.findOne({ where: { id } });
  }

  public static async getByLogin(login: string): Promise<User | null> {
    return userRepository.findOne({ where: { login } });
  }

  public static async getByEmail(email: string): Promise<User | null> {
    return userRepository.findOne({ where: { email } });
  }

  public static async checkPassword(user: User, password: string): Promise<boolean> {
    return comparePasswords(password, user.passwordHash);
  }

  public static async create(login: string, email: string, password: string): Promise<User> {
    const user = userRepository.create({
      login,
      email,
      createdAt: new Date()
    });
    user.passwordHash = await hashPassword(password);
    return userRepository.save(user);
  }

  public static async update(
    user: User,
    data: { login?: string; email?: string; password?: string; lastAuthAt?: Date }
  ): Promise<User> {
    const { login, email, password } = data;
    if (login) {
      user.login = login;
    }
    if (email && email !== user.email) {
      user.email = email;
      user.emailVerifiedAt = null;
    }
    if (password) {
      user.passwordHash = await hashPassword(password);
    }
    user = await userRepository.save(user);
    return user;
  }

  public static async delete(user: User): Promise<boolean> {
    const result = await userRepository.delete(user.id);
    return !!result.affected;
  }
}
