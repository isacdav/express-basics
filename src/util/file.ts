import fs from 'fs';
import path from 'path';
import { rootDir } from '../util/path';

const p = path.join(rootDir, 'data', 'products.json');

export const getProductsFromFile = () => {
  const promise = new Promise<IProduct[]>((resolve) => {
    let prods: IProduct[] = [];
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return resolve([]);
      }

      try {
        prods = JSON.parse(fileContent.toString());
      } catch (err) {
        console.log(err);
      } finally {
        resolve(prods);
      }
    });
  });

  return promise;
};

export const writeProductsToFile = (products: IProduct[]) => {
  fs.writeFile(p, JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
