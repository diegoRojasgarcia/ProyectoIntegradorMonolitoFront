export interface Auth {
  name: any;
  email: string;
  password: string;
}

export interface CrearLineaProducto {
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
  cant: number;
  producto: any;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  subprice: number;
}