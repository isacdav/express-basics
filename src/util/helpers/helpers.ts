import path from 'path';

export const rootDir = path.dirname(require?.main?.filename || '');

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};
