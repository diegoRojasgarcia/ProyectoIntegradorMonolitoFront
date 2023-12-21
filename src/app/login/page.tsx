

/* eslint-disable react/no-unescaped-entities */
"use client";

import { gql, useMutation} from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Auth } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const LOGIN_USER = gql`
  mutation Login($input: LoginRequestDto!) {
    login(loginUserInput: $input) {
      status
      token
      error
      idUser
    }
  }
`;

const CREATE_CART = gql`
  mutation CreateCarrito($input: CreateCarritoInput!) {
    createCarrito(createCarritoInput: $input) {
      status
      error
      message
      idCarrito
    }
  }
`;


export default function Home() {
  const [createCarrito] = useMutation(CREATE_CART);
  const [userId, setUserId] = React.useState(null);
  const [carritoId, setCarritoId] = React.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: async (data) => {
      console.log("Login completado:", data);
      console.log("Login completado:", data.login.idUser);
      localStorage.setItem("userId", data.login.idUser); 
      if (data.login && data.login.idUser) {
        const userId = data.login.idUser;
        localStorage.setItem("userId", userId.toString()); 
        localStorage.setItem('userId', userId);
        try {
          console.log("Intentando crear carrito para el usuario:", userId);
          // Ejecutar la mutación para crear el carrito
          const carritoResponse = await createCarrito({
            variables: {
              input: { idUser: userId}
            }
          });
          
          console.log("Cart creation response:", carritoResponse);

          console.log("Respuesta de la creación del carrito:", carritoResponse);
          if (carritoResponse.data && carritoResponse.data.createCarrito){
            const carritoId = carritoResponse.data.createCarrito.idCarrito;
            setCarritoId(carritoId);
            localStorage.setItem('cartId', carritoId.toString()); 
            console.log("Carrito creado y guardado en localStorage, redirigiendo al usuario");
            console.log("Datos del usuario guardados en localStorage", userId,carritoId);
          }
        } catch (carritoError) {
          // Manejar errores en la creación del carrito aquí
          console.error("Error al crear el carrito:", carritoError);
        }
  
        // Redirigir al usuario a la página de inicio (o donde sea adecuado)
        router.push("/");
      }else{
        console.error("Login failed:", data.login.error);
      }
    },
    onError: (error) => {
      console.error('GraphQL error:', error);
    },
  });
  
 
  
  
  const router = useRouter();

  const onSubmit = handleSubmit(async (dataform) => {
    const LoginUserInput = {
      email: dataform.email,
      password: dataform.password,
    };
    login({
      variables: {
        input: {
          email: dataform.email,
          password: dataform.password,
        },
      },
    });
  });
  
  return (
    <><div className="h-screen bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-36">
        <div className="w-80 p-8 bg-slate-100 rounded-md shadow-2xl ">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Login
          </h1>
          <form onSubmit={onSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              {errors.email && (
                <div className="border-red-200 border rounded bg-red-100 text-red-700 mt-2">
                  <p>Field is a required</p>
                </div>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              {errors.password && (
                <div className="border-red-200 border rounded bg-red-100 text-red-700 mt-2">
                  <p>Field is a required</p>
                </div>
              )}
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="justify-center items-center flex bg-gray-900 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 h-12"
                disabled={loading}
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-100 fill-gray-600 dark:fill-gray-100"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg>
                  </div>
                ) : (
                  <div>Ingresar</div>
                )}
              </button>
              {error && (
                <div role="alert" className="pt-6">
                  <div className="justify-center items-center flex border-red-400 rounded bg-red-100 px-4 py-3 text-red-700 ">
                    <p>{error.message}</p>
                  </div>
                </div>
              )}
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div><Footer /></> 
  );
}

