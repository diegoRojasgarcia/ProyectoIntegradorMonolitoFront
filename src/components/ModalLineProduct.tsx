
import { CrearLineaProducto, ProductInCart } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addToCart } from './ShoppingCarts';
import { gql, useMutation } from "@apollo/client";


const CREAR_LINEA_PRODUCTO = gql`
  mutation CrearLineaProducto($input: CreateLineaProductoInput!) {
    crearLineaProducto(createLineaProductoInput: $input) {
      status
      error
      message
    }
  }
`;

export function ModalLineProduct({ closeModalCreate, crearLineProduct, product }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearLineaProducto>();
  const [message, setMessage] = useState('');
  console.log(product)
  const [crearLineaDeProducto, { data, loading, error }] = useMutation(CREAR_LINEA_PRODUCTO);
  const [carritoId, setCarritoId] = useState<number | null>(null);
  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCarritoId(parseInt(storedCartId));
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    const productToAdd: ProductInCart = {
      producto: {
        id: product.id, 
        name: product.name, 
        description: product.description, 
        price: product.price.toString(), 
        image: product.image, 
      },
      id: product.id.toString(), 
      name: product.name,
      price: product.subprice, 
      quantity: parseInt(data.cantidad as unknown as string),
      image: "",
      subprice: 0,
      cant: 0
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
            idcarrito: parseFloat(carritoId.toString()),
            idProducto: parseFloat(product.id.toString()),
            cant: parseInt(data.cantidad as unknown as string),
            subprice: parseFloat((product.price * data.cantidad).toFixed(2))
          }
        }
      }).then(response => {
        if (response.data.crearLineaProducto.status === 200) {
          setMessage(response.data.crearLineaProducto.message);
          crearLineProduct(data);
          closeModalCreate(false);
        } else {
          setMessage(`Error: ${response.data.crearLineaProducto.error}`);
        }
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
                  type="number" min="1"
                  {...register("cantidad", { 
                      required: "La cantidad es requerida", 
                      min: {
                        value: 1,
                        message: "Cantidad debe ser mayor que 0"
                      }
                  })}
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.cantidad && <span className="text-red-500">{errors.cantidad.message}</span>}

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
