"use client";

import { gql, useMutation } from "@apollo/client";
import React, { FC, useCallback, useMemo } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { Auth } from "@/types";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  
  const CREATE_USER = gql`
  mutation register($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      user {
        email
      }
      access_token
  }
  }
  `;

  const [createUser] = useMutation(CREATE_USER);
    type RegisterFormData = Auth & {
      confirm_password: string;
  };
  
  const onSubmit = async (dataform: RegisterFormData) => {
      if (dataform.password !== dataform.confirm_password) {
          console.error("Passwords do not match");
          return;
      }
  
      const userInput = {
          email: dataform.email,
          password: dataform.password,
          fullname: dataform.fullname,
      };
      console.log(userInput);

      try {
        const response = await createUser({ variables: { input: userInput } });
        console.log(response); 
        router.push("/index");
      } catch (err) {
        console.error("Error creating user:", err);
      }
    };
  

    return (
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
              <div className="bg-white shadow-md rounded-md p-6">
                  <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
                  <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Sign up for an account
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" method="POST">
                      <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                          <div className="mt-1">
                              <input 
                                  {...register('fullname', { required: true })}
                                  type="text" 
                                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                              />
                          </div>
                      </div>
  
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <div className="mt-1">
                              <input 
                                  {...register('email', { required: true })}
                                  type="email" 
                                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                              />
                          </div>
                      </div>
  
                      <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <div className="mt-1">
                              <input 
                                  {...register('password', { required: true })}
                                  type="password" 
                                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                              />
                          </div>
                      </div>
  
                      <div>
                          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                          <div className="mt-1">
                              <input 
                                  {...register('confirm_password', { required: true })}
                                  type="password" 
                                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                              />
                          </div>
                      </div>
  
                      <div>
                          <button type="submit"
                              className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                              Register Account
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}
