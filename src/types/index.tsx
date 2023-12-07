export interface Auth {
  fullname: any;
  email: string;
  password: string;
}

export interface CreateLineProduct {
  cantidad: number;
}

export interface Product {
  image: string | undefined;
  id: number;
  name: string;
  description: string;
  price: string;
  
}
export interface ProductInCart {
  image: string | undefined;
  id: string;
  name: string;
  price: number;
  quantity: number;
}