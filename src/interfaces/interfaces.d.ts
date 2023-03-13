interface IProduct {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  qty?: number;
  save?: () => void;
  getAll?: () => Promise<IProduct[]>;
  getById?: (id: number) => Promise<IProduct?>;
}

interface ICart {
  products: ICartProduct[];
  totalPrice: number;
}

interface ICartProduct {
  id: number;
  qty: number;
}
