interface IProduct {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  save?: () => void;
  getAll?: () => Promise<IProduct[]>;
  getById?: (id: number) => Promise<IProduct?>;
}
