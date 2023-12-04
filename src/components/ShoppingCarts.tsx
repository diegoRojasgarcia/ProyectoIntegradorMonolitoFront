import { ProductInCart } from '@/types';
import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '@/app/page';

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

export const GET_PRODUCTS_IN_CART = gql`
  query GetLineProductsInCart($cartId: Int!) {
    findAllLineProductsInCart(cartId: $cartId) {
      id
      product {
        id
        name
      }
      cant
      subprice
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

export function getTotal(): number {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
}

export function getCount(): number {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
}

export function ShoppingCart() {
  const [products, setProducts] = useState<ProductInCart[]>(getCart());
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const cartItems = useReactiveVar(cartItemsVar);
  const [updateProductLine] = useMutation(UPDATE_PRODUCT_LINE);
  const [deleteProductLine] = useMutation(DELETE_PRODUCT_LINE);
  const { loading, error, data } = useQuery(GET_PRODUCTS_IN_CART, {
    variables: { cartId: carritoId },
  });;
  

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCarritoId(parseInt(storedCartId));
    }
    if (data) {
        const productsFromDB = data.findAllLineProductsInCart.map((item: { id: any; product: { name: any; }; subprice: any; cant: any; }) => ({
          id: item.id,
          name: item.product.name,
          price: item.subprice, 
          quantity: item.cant,
        }));
        setProducts(productsFromDB);
      }
    },[data]);

    const removeProduct = async (id: string) => {
        console.log(id);
        try {
          const productId = parseFloat(id);
          console.log(productId);
          // Asegúrate de pasar la variable con el nombre correcto ('id' en lugar de 'productId')
          const { data } = await deleteProductLine({ variables: { id: productId } }); 
          if (data.deleteLineProduct) {
            console.log('Producto eliminado con éxito');
            // Actualiza el estado para reflejar que el producto ha sido eliminado
            // Asegúrate de que 'setProducts' maneje correctamente los tipos de datos de ID (string vs. number)
            setProducts(prevProducts => prevProducts.filter(product => parseFloat(product.id) !== productId));
          } else {
            console.error('No se pudo eliminar el producto, el servidor devolvió false');
          }
        } catch (error: unknown) {
          // El manejo del error aquí dependerá del tipo de error que se esté lanzando
          if (error instanceof Error) {
            console.error('Error al eliminar el producto:', error.message);
          }
        }
      };
      

  const clearAll = () => {
    clearCart();
    setProducts([]);
  }
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
          {products.length ? (
              products.map(product => (
                  <li key={product.id} className="flex items-center border p-2 rounded">
                      <div className="flex-grow">
                          <h3 className="text-lg text-black">{product.name}</h3>
                          <p className='text-red-500'>Precio: ${Math.floor(product.price)}</p>
                          <p className="text-black">Cantidad: {product.quantity}</p>
                      </div>
                      <button onClick={() => removeProduct(product.id)} className="bg-transparent p-2">
                          X {/* Esto representa el ícono de "cerrar". */}
                      </button>
                  </li>
              ))
          ) : (
              <p className="cart-empty">El carrito está vacío</p>
          )}
      </ul>
      {products.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
              <span className="text-xl text-black">Subtotal:</span>
              <span className="text-xl text-black">${Math.floor(getTotal())}</span>

              <button onClick={clearAll} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                  Vaciar Carrito
              </button>
              <button type="button" onClick={handleCheckoutClick} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Proceder con la Venta</button>
          </div>
      )}
    </div>
  );
};

export default ShoppingCart;


