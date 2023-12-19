"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ProductInCart } from "@/types";

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
  export function getCart(): ProductInCart[] {
    return cart;
    }
    let cart: ProductInCart[] = [];

  export default function Example() {
    const [products, setProducts] = useState<ProductInCart[]>(getCart());
    const [carritoId, setCarritoId] = useState<number | null>(null);
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
      useEffect(() => {
        console.log("consola",carritoId)
        if (data  && data.getLineaProductoByIdCarrito && data.getLineaProductoByIdCarrito.lp) {
            const productsFromDB = data.getLineaProductoByIdCarrito.lp.map((item: { id: any; product: { name: any; image: any; }; subprice: any; cant: any; })  => ({
                id: item.id,
                name: item.product?.name,
                price: item.subprice,
                quantity: item.cant,
          }));
          setProducts(productsFromDB);
        }
      }, [carritoId, data]);
    const getTotalParcial = (products: any[]) => {
        return products.reduce((acc, product) => acc + product.price, 0);
    };
    const getTotal = (products: any[]) => {
        return products.reduce((acc, product) => acc + product.price, 2500);
    };
return (
    <><NavBar /><><>
        <div className="hidden lg:block fixed top-[50%] left-0 w-1/2 h-10 bg-white bg-white mt-50 bg-white margin-top-900px mt-20" aria-hidden="true"></div>
        <div className="hidden lg:block fixed top-20 h-[calc(100%-10rem)] bottom-56 right-0 w-1/2 bg-gray-800 " aria-hidden="true"></div>
        <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2  margin-top: 100px mt-10">
            <section
                aria-labelledby="summary-heading"
                className="bg-indigo-900 text-indigo-300 pt-6 pb-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
            >
                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                    <h2 id="summary-heading" className="sr-only">
                        Order summary
                    </h2>

                    <dl>
                        <dd className="mt-1 text-3xl font-extrabold text-white">Detalle de compra</dd>
                    </dl>

                    <ul role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
                        {data?.getLineaProductoByIdCarrito?.lp.length ? (
                            data.getLineaProductoByIdCarrito.lp.map((item: ProductInCart, index: any) => (
                                <li key={`${item.producto.id}_${index}`} className="flex items-start py-6 space-x-4">
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-white">{item.producto.name}</h3>
                                        <h3 className="text-white">Cantidad: {item.cant}</h3>
                                    </div>
                                    <p className="flex-nsone text-base font-medium text-white">${item.subprice}</p>
                                </li>
                            ))
                        ) : (
                            <p className="cart-empty">El carrito está vacío</p>
                        )}
                    </ul>

                    <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                        <div className="flex items-center justify-between">
                            <dt>Total parcial</dt>
                            <dd>${Math.floor(getTotalParcial(products))}</dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt>Envío</dt>
                            <dd>$2500</dd>
                        </div>

                        <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                            <dt className="text-base">Total</dt>
                            <dd className="text-base">${Math.floor(getTotal(products))}</dd>
                        </div>
                    </dl>
                </div>
            </section>

            <section
                aria-labelledby="payment-and-shipping-heading"
                className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
            >
                <h2 id="payment-and-shipping-heading" className="sr-only">
                    Payment and shipping details
                </h2>

                <form>
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                        <div>
                            <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                Información del contacto
                            </h3>

                            <div className="mt-6">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Dirección de correo electrónico
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        id="email-address"
                                        name="email-address"
                                        autoComplete="email"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 id="shipping-heading" className="text-lg font-medium text-gray-900">
                                Dirección de envío
                            </h3>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        DIRECCIÓN
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            autoComplete="street-address"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        Ciudad
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            autoComplete="address-level2"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        Provincia
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="region"
                                            name="region"
                                            autoComplete="address-level1"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Código Postal
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="postal-code"
                                            name="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                className="bg-gray-800  border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                                Pagar ahora
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </><Footer /></></>
    ) 
  }