import * as Joi from 'joi';
import { joiPassword } from 'joi-password';

export abstract class UserValidators {
  public static id = Joi.string().uuid();
  public static login = joiPassword.string().min(3).max(255).noWhiteSpaces();
  public static email = joiPassword.string().email().noWhiteSpaces();
  public static password = joiPassword
    .string()
    .min(8)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .minOfSpecialCharacters(1);
}
