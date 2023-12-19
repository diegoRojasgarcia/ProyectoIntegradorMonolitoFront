/* eslint-disable react/no-unescaped-entities */
"use client";

import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Auth } from "@/types";
import Link from "next/link";
import { assertWrappingType } from "graphql";

type RegisterFormData = Auth & {
  confirm_password: string;
};

const CREATE_USER = gql`
  mutation register($input: RegisterRequestDto!) {
    register(registerUserInput: $input) { 
      status,
      error,
      message
    }
  }
`;
export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();


  const [createUser, { error }] = useMutation(CREATE_USER);

  const onSubmit = async (dataform: RegisterFormData) => {
  
    const userInput = {
      email: dataform.email,
      password: dataform.password,
      name: dataform.name,
    };
    try {
      const response = await createUser({ variables: { input: userInput } });
      console.log(response);
      router.push("/login");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="h-screen bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-6">
          <div className="w-50 p-8 bg-slate-100 rounded-md shadow-2xl">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-900">Username</label>
              <div className="mt-4">
                <input
                  {...register('name', { required: true })}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-900">Email</label>
              <div className="mt-2">
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {errors.email && (
                <div className="text-red-500">Email is required.</div>
              )}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900">Password</label>
              <div className="mt-2">
                <input
                  {...register('password', { required: true, minLength: 8 })}
                  type="password"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
              {errors.password && (
                <div className="text-red-500">Password is required and must be at least 8 characters long.</div>
              )}
            </div>
  
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-semibold text-gray-900">Confirm Password</label>
              <div className="mt-1">
                <input
                  {...register('confirm_password', { required: true })}
                  type="password"
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                />
              </div>
              {errors.confirm_password && (
                <div className="text-red-500">Please confirm your password.</div>
              )}
            </div>
  
            {error && (
              <div role="alert" className="pt-6">
              <div className="justify-center items-center flex border-red-400 rounded bg-red-100 px-4 py-3 text-red-700 ">
                <p>{error.message}</p>
              </div>
            </div>
            )}
  
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Register Account

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
}
