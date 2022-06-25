export const logger = {
  log: (...msg: any[]): void => {
    console.log(...msg);
  },
  error: (...msg: any[]): void => {
    console.error(...msg);
  }
};
