import { ProductInCart } from '@/types';
import React, { useState, useEffect } from 'react';


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

function ShoppingCart() {
  const [products, setProducts] = useState<ProductInCart[]>(getCart());

  useEffect(() => {
    setProducts(getCart());
  }, [cart]);

  const removeProduct = (id: string) => {
    removeProductFromCart(id);
    setProducts([...getCart()]);
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
                <button className="btn-clear-all" onClick={clearAll}>
                    Vaciar Carrito
                </button>
            </div>
        )}
        <button className="checkout-button" onClick={handleCheckoutClick}>
                Proceder con la Venta
            </button>
    </div>
  );
}

export default ShoppingCart;


