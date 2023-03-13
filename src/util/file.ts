import fs from 'fs';
import path from 'path';
import { rootDir } from '../util/path';

const cartPath = path.join(rootDir, 'data', 'cart.json');
const productsPath = path.join(rootDir, 'data', 'products.json');

type PathTypes = 'cart' | 'products';

const paths = {
  cart: cartPath,
  products: productsPath,
};

const getPathFromType = (type: PathTypes) => {
  return paths[type];
};

export const getObjectsFromFile = (type: PathTypes, single = false): any => {
  const p = getPathFromType(type);
  const promise = new Promise((resolve) => {
    let objs: any;
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return resolve(single ? {} : []);
      }

      try {
        objs = JSON.parse(fileContent.toString());
      } catch (err) {
        console.log(err);
      } finally {
        resolve(objs);
      }
    });
  });

  return promise;
};

export const writeObjectsToFile = (type: PathTypes, objs: any) => {
  const p = getPathFromType(type);
  fs.writeFile(p, JSON.stringify(objs), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
