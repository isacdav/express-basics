interface IProduct {
  title: string;
  save?: () => void;
  getAll?: () => IProduct[];
}
