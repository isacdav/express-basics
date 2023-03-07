interface IProduct {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  save?: () => void;
  getAll?: () => Promise<IProduct[]>;
}
