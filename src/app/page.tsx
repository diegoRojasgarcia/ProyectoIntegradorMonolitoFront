"use client";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const LOGIN_USER = gql`
//   mutation login($input: LoginUserInput!) {
//     login(loginUserInput: $input) {
//       user {
//         email
//       }
//       access_token
//     }
//   }
// `;

import { useForm } from "react-hook-form";
import ModalLineProduct from "../components/ModalLineProduct";
import { CreateLineProduct } from "@/types";

export interface Auth {
  email: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  const [showModalLineProduct, setShowModalLineProduct] = useState(false);
  //const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const router = useRouter();

  const crearLineProduct = async (dataLineProduct: CreateLineProduct) => {
    const cantidad = dataLineProduct.cantidad;
    console.log(
      "se ha creado la line product, cantidad del producto",
      cantidad
    );
    setShowModalLineProduct(false);
  };

  const closeModalCreate = () => {
    setShowModalLineProduct(false);
  };

  return (
    <div className="pt-2 min-h-screen max-h-full bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 pt-20 sm:mb-98">
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-98 "
            onClick={() => setShowModalLineProduct(true)}
          >
            <img
              className="h-auto max-w-full  "
              src="https://tecdn.b-cdn.net/img/new/standard/city/041.jpg"
              alt="Sunset in the mountains"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Hamburguesa Clásica</div>
              <p className="text-gray-700 text-base">
                Una jugosa hamburguesa de carne de res con lechuga, tomate,
                cebolla y salsa especial.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-98 "
            onClick={() => setShowModalLineProduct(true)}
          >
            <img
              className="h-auto max-w-full  "
              src="https://tecdn.b-cdn.net/img/new/standard/city/041.jpg"
              alt="Sunset in the mountains"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Hamburguesa con Champiñones
              </div>
              <p className="text-gray-700 text-base">
                Hamburguesa con champiñones salteados, queso cheddar, lechuga y
                cebolla caramelizada.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-98"
            onClick={() => setShowModalLineProduct(true)}
          >
            <img
              className="h-auto max-w-full  "
              src="https://tecdn.b-cdn.net/img/new/standard/city/041.jpg"
              alt="Sunset in the mountains"
            ></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Una jugosa hamburguesa de carne de res con lechuga, tomate,
                cebolla y salsa especial.
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        </div>
        {showModalLineProduct ? (
          <ModalLineProduct
            closeModalCreate={closeModalCreate}
            crearLineProduct={crearLineProduct}
          />
        ) : null}
      </div>
    </div>
  );
}
