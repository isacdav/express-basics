interface IProduct {
  title: string;
  save?: () => void;
  getAll?: () => Promise<IProduct[]>;
}
