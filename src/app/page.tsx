
"use client";

import { gql, useLazyQuery, useMutation, useQuery,  InMemoryCache, makeVar  } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateLineProduct, Auth, Product } from "@/types";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ButtonCars from  "@/components/ButtonCars";
import { ModalLineProduct } from "@/components/ModalLineProduct";

export const cartItemsVar = makeVar([]);

const Product_QUERY = gql`
  query {
    products {
      id
      name
      description
      price
      image
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
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const router = useRouter();
  const [favoriteBurgers, setFavoriteBurgers] = useState<Product[]>([]);

  const crearLineProduct = async (dataLineProduct: CreateLineProduct) => {
    const cantidad = dataLineProduct.cantidad;
    console.log(
      "se ha creado la line product, cantidad del producto",
      cantidad
     
    );
    setShowModalLineProduct(false);
    console.log(cantidad);
  };

  const closeModalCreate = () => {
    setShowModalLineProduct(false);
  };
  
  const handleProductClick = (product: Product) => {
    setProductSelected(product);
    setShowModalLineProduct(true);
    console.log(product);
  };
 

useEffect(() => {
  if (data && data.products && data.products.length >= 3) {
      setFavoriteBurgers(data.products.slice(2, 5));
  }
}, [data]);

return (
  <>
    <NavBar />
    <div className="pt-2 min-h-screen max-h-full bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="flex justify-end mr-10">
        <ButtonCars />
      </div>
      <div className="mx-auto px-4 py-0 sm:px-5 sm:py-2 lg:max-w-6xl lg:px-6">
        
        {/* Sección de Hamburguesas Favoritas */}
        <h2 className="text-2xl font-bold mb-4 text-center bg-gray-800 text-white py-2 rounded">Hamburguesas Favoritas</h2>

        <div className="grid grid-cols-1 gap-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-7 mb-8">
          {favoriteBurgers.map((product: Product) => (
            <div
              key={product.id}
              className="rounded-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-84 hover:bg-cyan-50 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-100 h-64 overflow-hidden relative">
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={product.image}
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <div className="text-sm mb-2 text-gray-600">{product.description}</div>
                <div className="font-medium text-sm text-gray-700">${product.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Todas las Hamburguesas */}
        <h2 className="text-2xl font-bold mb-4 text-center bg-gray-800 text-white py-2 rounded">Todas las Hamburguesas y bebestibles</h2>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-7">
          {data && data.products.map((product: Product) => (
            <div
              key={product.id}
              className="rounded-lg bg-slate-100 xl:aspect-h-8 xl:aspect-w-2 h-84 hover:bg-cyan-50 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-100 h-64 overflow-hidden relative">
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <div className="text-sm mb-2 text-gray-600">{product.description}</div>
                <div className="font-medium text-sm text-gray-700">${product.price}</div>
              </div>
            </div>
          ))}
        </div>

        {showModalLineProduct ? (
          <ModalLineProduct
            closeModalCreate={closeModalCreate}
            crearLineProduct={crearLineProduct}
            product={productSelected}
          />
        ) : null}
      </div>
    </div>
    <Footer />
  </>
);
};
