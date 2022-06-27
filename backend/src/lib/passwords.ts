import { compare, genSalt, hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, await genSalt(10));
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return compare(plainPassword, hashedPassword);
}
