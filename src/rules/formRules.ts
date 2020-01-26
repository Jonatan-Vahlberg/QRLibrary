import { FormValueRule } from '../components/FormError';

export const passwordRules: FormValueRule[] = [
  (password: string) => {
    if (password.length < 6 || password.length > 16) {
      return {
        triggerd: true,
        message: 'Password needs to be between 6 and 15 characters',
      };
    }
    return { triggerd: false, message: '' };
  },
  (password: string) => {
    if (/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password) !== true) {
      return {
        triggerd: true,
        message: 'Password must contain at least 1 letter and number',
      };
    }
    return { triggerd: false, message: '' };
  },
];

export const emailRules: FormValueRule[] = [];
