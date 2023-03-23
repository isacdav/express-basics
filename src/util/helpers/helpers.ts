import { dirname } from 'path';

export const rootDir = dirname(require?.main?.filename || '');

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};
