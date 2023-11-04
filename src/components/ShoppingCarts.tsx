import React, { useState, useEffect } from 'react';

type ProductInCart = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

let cart: ProductInCart[] = [];

export function addToCart(product: ProductInCart) {
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
}

function getCart() {
    return cart;
}

function clearCart() {
    cart = [];
}

function removeProductFromCart(id: string) {
    cart = cart.filter(product => product.id != id);
}

function getTotal() {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
}

function getCount() {
    return cart.reduce((acc, product) => acc + product.quantity, 0);
}

function ShoppingCart() {
  const [products, setProducts] = useState<ProductInCart[]>(getCart());

  useEffect(() => {
    setProducts(getCart());
  }, [cart]); // Actualizamos el componente cuando cambie el carrito

  const removeProduct = (id: number) => {
    removeProductFromCart(id.toString());
    setProducts([...getCart()]);
  };

  const subtotal = getTotal();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black mb-4">Carrito de compra</h2>
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="flex items-center border p-2 rounded">
            {/* <img alt={product.imageAlt} className="w-24 h-24 object-cover rounded mr-4" /> */}
            <div className="flex-grow">
              <h3 className="text-lg text-black">{product.name}</h3>
              <p className='text-red-500'>Precio: ${product.price.toFixed(2)}</p>
              <p className="text-black">cantidad: {product.quantity}</p>
            </div>
            <button onClick={() => removeProduct(parseInt(product.id))} className="bg-black text-white py-1 px-3 rounded hover:bg-gray-800 transition duration-300">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl text-black">Subtotal:</span>
        <span className="text-xl text-black">${subtotal.toFixed(2)}</span>
      </div>
    </div>
);

}

export default ShoppingCart;
