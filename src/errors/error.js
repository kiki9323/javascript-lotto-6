import { MessageFormat } from '../lib/messageFormat.js';

class AppError extends Error {
  constructor(message) {
    super(MessageFormat.error(message));
    this.name = 'AppError';
  }
}

export default AppError;
