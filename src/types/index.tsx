export interface Auth {
  fullname: any;
  email: string;
  password: string;
}

export interface CreateLineProduct {
  cantidad: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}
