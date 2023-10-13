/* eslint-disable @next/next/no-img-element */
"use client";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ModalLineProduct from "../components/ModalLineProduct";
import { CreateLineProduct, Auth, Product } from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Product_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
      ingredients {
        name
      }
    }
  }
`;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  const [showModalLineProduct, setShowModalLineProduct] = useState(false);
  const { loading, data, error } = useQuery(Product_QUERY);

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
    <>
      <NavBar />
      <div className="pt-2 min-h-screen max-h-full bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="mx-auto  px-4 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 pt-20 sm:mb-98">
            {data &&
              data.products.map((product: Product) => (
                <div
                  key={product.id}
                  className="rounded-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-84 hover:bg-cyan-50 cursor-pointer"
                  onClick={() => setShowModalLineProduct(true)}
                >
                  <img
                    className="w-full"
                    src="https://tecdn.b-cdn.net/img/new/standard/city/041.jpg" //product.img para agregar la del producto
                    alt="Sunset in the mountains"
                  ></img>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                  </div>
                </div>
              ))}
          </div>
          {showModalLineProduct ? (
            <ModalLineProduct
              closeModalCreate={closeModalCreate}
              crearLineProduct={crearLineProduct}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
