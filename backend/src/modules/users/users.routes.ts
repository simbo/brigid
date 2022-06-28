import { badRequest, notFound } from '@hapi/boom';
import { ServerRoute } from '@hapi/hapi';
import * as Joi from 'joi';

import { comparePasswords } from '../../lib/passwords';
import { UserRepository } from './user.repository';
import { UserValidators } from './user.validators';

export const usersRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    options: {
      description: 'retrieve users list'
    },
    handler: async (request, h) => {
      const users = await UserRepository.list();
      return { users: users.map(user => user.toResponseObject()) };
    }
  },

  {
    method: 'POST',
    path: '/login-exists',
    options: {
      description: 'test if an user with given login exists',
      validate: {
        payload: Joi.object({
          login: UserValidators.login.required()
        })
      }
    },
    handler: async (request, h) => {
      const payload = request.payload as { login: string };
      const result = await UserRepository.loginExists(payload.login);
      return { result };
    }
  },

  {
    method: 'POST',
    path: '/email-exists',
    options: {
      description: 'test if an user with given email exists',
      validate: {
        payload: Joi.object({
          email: UserValidators.email.required()
        })
      }
    },
    handler: async (request, h) => {
      const payload = request.payload as { email: string };
      const result = await UserRepository.emailExists(payload.email);
      return { result };
    }
  },

  {
    method: 'POST',
    path: '/signup',
    options: {
      description: 'create a new user',
      validate: {
        payload: Joi.object({
          login: UserValidators.login.required(),
          email: UserValidators.email.required(),
          password: UserValidators.password.required()
        })
      }
    },
    handler: async (request, h) => {
      const payload = request.payload as { login: string; email: string; password: string };
      const { login, email, password } = payload;
      if (await UserRepository.loginExists(login)) {
        return badRequest('login is already taken');
      }
      if (await UserRepository.emailExists(email)) {
        return badRequest('email is already taken');
      }
      const user = await UserRepository.create(login, email, password);
      if (!user) {
        return badRequest('could not create user');
      }
      return { user: user.toResponseObject() };
    }
  },

  {
    method: 'GET',
    path: '/{id}',
    options: {
      description: 'return user data by id',
      validate: {
        params: Joi.object({
          id: UserValidators.id.required()
        })
      }
    },
    handler: async (request, h) => {
      const params = request.params as { id: string };
      const user = await UserRepository.getById(params.id);
      if (!user) {
        return notFound('user not found');
      }
      return { user: user.toResponseObject() };
    }
  },

  {
    method: 'DELETE',
    path: '/{id}',
    options: {
      description: 'delete a user',
      validate: {
        params: Joi.object({
          id: UserValidators.id.required()
        })
      }
    },
    handler: async (request, h) => {
      const params = request.params as { id: string };
      let user = await UserRepository.getById(params.id);
      if (!user) {
        return notFound('user not found');
      }
      const result = await UserRepository.delete(user);
      if (!result) {
        return badRequest('could not delete user');
      }
      return { result };
    }
  },

  {
    method: 'POST',
    path: '/{id}',
    options: {
      description: 'update user data',
      validate: {
        params: Joi.object({
          id: UserValidators.id.required()
        }),
        payload: Joi.object({
          login: UserValidators.login,
          email: UserValidators.email,
          password: UserValidators.password,
          currentPassword: UserValidators.password
        })
          .or('login', 'email', 'password')
          .with('password', 'currentPassword')
      }
    },
    handler: async (request, h) => {
      const params = request.params as { id: string };
      let user = await UserRepository.getById(params.id);
      if (!user) {
        return notFound('user not found');
      }
      const { login, email, password, currentPassword } = request.payload as {
        login?: string;
        email?: string;
        password?: string;
        currentPassword?: string;
      };
      console.log(password, currentPassword, user.passwordHash);
      if (password) {
        if (!currentPassword || !(await comparePasswords(currentPassword, user.passwordHash))) {
          return badRequest('current password does not match');
        }
        if (await comparePasswords(password, user.passwordHash)) {
          return badRequest('new password same as old password');
        }
      }
      user = await UserRepository.update(user, { login, email, password });
      if (!user) {
        return badRequest('could not update user');
      }
      return { user: user.toResponseObject() };
    }
  }
];
