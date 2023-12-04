
import { CreateLineProduct } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ShoppingCart, { addToCart } from './ShoppingCarts';
import { gql, useMutation } from "@apollo/client";


const CREAR_LINEA_PRODUCTO = gql`
  mutation crearLineaProducto($input: CreateLineaproductoInput!) {
    createLineProduct(createLineaproductoInput: $input) {
      id
      product {
        name
        price
      }
      cant
      subprice
    }
  }
  `;

export function ModalLineProduct({ closeModalCreate, crearLineProduct, product }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLineProduct>();
  const [message, setMessage] = useState('');
  console.log(product)
  const [crearLineaDeProducto, { data, loading, error }] = useMutation(CREAR_LINEA_PRODUCTO);
  const [carritoIdStorage, setcarritodStorage] = React.useState('');
  const [carritoId, setCarritoId] = useState<number | null>(null);
  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCarritoId(parseInt(storedCartId));
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(data.cantidad as unknown as string)
    };
    if (!carritoId) {
      console.error('Falta el ID del carrito');
      return;
    }
    addToCart(productToAdd);  
    setMessage('Producto agregado al carrito!'); 
    try {
      crearLineaDeProducto({
        variables: {
          input: {
            idCarrito: carritoId,
            idProduct: product.id,
            cant: parseInt(data.cantidad as unknown as string)
          }
        }
      }).then(response => {
        // Handle response if needed
        crearLineProduct(data);
        closeModalCreate(false);
      }).catch(error => {
        console.error(error);
        setMessage('Ocurrió un error al añadir el producto a la base de datos.');
      });
    } catch (e) {
      console.error(e);
      setMessage('Ocurrió un error al añadir el producto a la base de datos.');
    }
  });
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-5 mx-auto max-w-sm">
          <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-100 rounded-t">
            <img
                className="w-full"
                src={product.image}
                alt="Sunset in the mountains"
              />
            </div>
            <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  <div className="text-sm mb-2 text-gray-600">{product.description}</div>
                  <div className="font-medium text-sm text-gray-700">${product.price}</div>
                </div>
            <div className="px-0 py-0">
            </div>
            <div className="relative p-2 flex-auto">
            {message && <div className="mb-4 text-green-500">{message}</div>}
              <form onSubmit={onSubmit}>
              <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-500">
                  Cantidad
              </label>
              <input
                  type="number"
                  {...register("cantidad", { 
                      required: true, 
                      validate: value => parseInt(value.toString(), 10) > 0 || "Cantidad debe ser mayor que 0" 
                  })}
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.cantidad && <span>{errors.cantidad.message || "Field is a required"}</span>}
              </div>

                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b mt-6">
                  <button
                    className="bg-cyan-100 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="submit"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => closeModalCreate(false)}
                    className="bg-gray-900 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
