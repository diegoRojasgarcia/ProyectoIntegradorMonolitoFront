import { ProductInCart } from '@/types';
import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '@/app/page';
import Link from 'next/link';


export const UPDATE_PRODUCT_LINE = gql`
    mutation UpdateProductLine($id: String!, $quantity: Int!) {
        updateProductLine(id: $id, quantity: $quantity) {
            id
            quantity
        }
    }
`;

export const DELETE_PRODUCT_LINE = gql`
    mutation DeleteProductLine($id: Float!) {
        deleteLineProduct(id: $id)
    }
`;

export const VACIAL_CARROTO = gql`
mutation vaciarCarrito($input: vaciarCarritoRequest!) {
    vaciarCarrito(vaciarCarritoInput: $input) {
      status
      error
      Empty
    }
  }
`;

export const GET_PRODUCTS_IN_CART = gql`
  query LineaProductoByIdCarrito($input: getProductoByIdCarritoInput!) {
    getLineaProductoByIdCarrito(getLineaProductoByIdCarritoInput: $input) {
      status
      error
      lp {
        id
        producto {
          id
          name
          description
          image
        }
        cant
        subprice
        idcarrito
      }
    }
  }
`;

let cart: ProductInCart[] = [];

export function addToCart(product: ProductInCart) {
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
}

function Cart() {
    let [cartItems, setCartItems] = useState<ProductInCart[]>(cart);
}

export function getCart(): ProductInCart[] {
    return cart;
}

export function clearCart() {
    cart = [];
}

export function removeProductFromCart(id: string) {
    cart = cart.filter(product => product.id !== id);
}

export function ShoppingCart() {
  const [products, setProducts] = useState<ProductInCart[]>(getCart());
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const [updateProductLine] = useMutation(UPDATE_PRODUCT_LINE);
  const [deleteProductLine] = useMutation(DELETE_PRODUCT_LINE);
  const [vaciarCarrito]=useMutation(VACIAL_CARROTO);
  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_PRODUCTS_IN_CART, {
    variables: { input: { id: carritoId } },
    skip: !carritoId,
    pollInterval: 1,
  });

useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCarritoId(parseInt(storedCartId));
    }
  }, []);
  console.log("idcart",carritoId)
  useEffect(() => {
    if (data  && data.getLineaProductoByIdCarrito && data.getLineaProductoByIdCarrito.lp) {
      const productsFromDB = data.getLineaProductoByIdCarrito.lp.map((item: { id: any; product: { name: any; }; subprice: any; cant: any; })  => ({
        id: item.id,
        name: item.product?.name,
        price: item.subprice,
        quantity: item.cant
      }));
      setProducts(productsFromDB);
    }
  }, [data]);

  useEffect(() => {
    if (carritoId !== null) {
      startPolling(1);
    }

    return () => {
      stopPolling();
    };
  }, [carritoId, startPolling, stopPolling]);

    const removeProduct = async (id: string) => {
        console.log(id);
        try {
          const productId = parseFloat(id);
          console.log(productId);
          const { data } = await deleteProductLine({ variables: { id: productId } }); 
          if (data.deleteLineProduct) {
            console.log('Producto eliminado con éxito');
            setProducts(prevProducts => prevProducts.filter(product => parseFloat(product.id) !== productId));
          } else {
            console.error('No se pudo eliminar el producto, el servidor devolvió false');
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Error al eliminar el producto:', error.message);
          }
        }
      };
      
    const getTotal = (products: any[]) => {
        return products.reduce((acc, product) => acc + product.price, 0);
    };
    
    const clearAll = async () => {
      if (carritoId === null) {
        console.error('No cart ID available for clearing');
        return;
      }
    
      try {
        const response = await vaciarCarrito({ 
          variables: { 
            input: { id: carritoId }
          } 
        });
    
        if (response.data.vaciarCarrito && response.data.vaciarCarrito.status === 'Success') {
          console.log('Carrito vaciado exitosamente');
          clearCart();
          setProducts([]);
        } else {
          console.error('Error al vaciar el carrito:', response.data.vaciarCarrito.error);
        }
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
      }
    };
    
  const handleCheckoutClick = () => {
    handleCheckout(products);
    setProducts([]);
  };

  function handleCheckout(products: ProductInCart[]) {
    console.log('Procesando la compra con los siguientes productos:', products);
    clearCart();
    setProducts(getCart());  
}


return (
    <div className="w-full max-w-3xl p-10 bg-white bg-opacity-90 rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-2xl font-bold text-black mb-4">Carrito de compra</h2>
      <ul className="space-y-4">
          {data?.getLineaProductoByIdCarrito?.lp.length ? (
              data.getLineaProductoByIdCarrito.lp.map((item: ProductInCart, index: any) => (
                  <li key={`${item.producto.id}_${index}`} className="flex items-center border p-2 rounded">
                      <div className="flex-grow">
                          <h3 className="text-lg text-black">{item.producto.name}</h3>
                          <p className='text-red-500'>Precio: ${Math.floor(item.subprice)}</p>
                          <p className="text-black">Cantidad: {item.cant}</p>
                      </div>
                      <button onClick={() => removeProduct(item.producto.id.toString())}  className="bg-transparent p-2">
                          X {/* Esto representa el ícono de "cerrar". */}
                      </button>
                  </li>
              ))
          ) : (
              <p className="cart-empty">El carrito está vacío</p>
          )}
      </ul>
      {data?.getLineaProductoByIdCarrito.lp.length  > 0 && (
          <div className="mt-4 flex justify-between items-center">
              <span className="text-xl text-black">Subtotal:</span>
              <span className="text-xl text-black">${Math.floor(getTotal(products))}</span>
              <button onClick={clearAll} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                  Vaciar Carrito
              </button>
              <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
               <Link href = "checkout" passHref>
                 Ir a pagar
                </Link>
              </button>
          </div>
      )}
    </div>
  );
};

export default ShoppingCart;


