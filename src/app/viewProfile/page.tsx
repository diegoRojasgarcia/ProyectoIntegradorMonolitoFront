"use client";

import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import Footer from '@/components/Footer';

  // const USER_QUERY = gql`
  //   query GetUser($id: Float!) {
  //     userById(id: $id) {
  //       id
  //       email
  //       fullname
  //     }
  //   }
  // `;
const USER_QUERY = gql`
  query findUser($input: FindUserRequestDto!) {
    findUserById(findUserById: $input) {
      status
      error
      user {
        name
        email
      }
    }
  }
`;
const ViewProfile = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loadUser, setLoadUser] = useState(false);
  const goBackHome = () => {
    router.push('/');
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const idParam = queryParams.get('id');
      if (idParam) {
        const numId = parseFloat(idParam);
        if (!isNaN(numId)) {
          setUserId(numId);
          setLoadUser(true);
        }
      }
      console.log("xd",idParam)
    }
  }, []);

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { input: { id: userId } },
    skip: !loadUser,
  });

  if (!data || !data.findUserById) return <p>No user found with id: {userId}</p>;
  
  const user = data.findUserById.user; 
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  
  return (
    <><div className="h-screen bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative flex flex-col items-center justify-center overflow-hidden pt-36">
        <div className="w-3/4 p-8 bg-slate-100 rounded-md shadow-2xl ">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg text-center">
              <div className="px-1 py-5 sm:px-6">
                <h3 className="text-lg leading-2 font-medium text-gray-900">User Details</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl className='flex justify-center'>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 ">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 ">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                  </div>
                </dl>
              </div>
              <li className="flex hidden lg:flex items-center">
                <button className="justify-center items-center flex w-full transition-colors duration-200 h-12"
                  type="submit">
                  <Link href="/" passHref>
                    <div className="ml-auto mr-3 py-2 px-6 bg-black hover:bg-opacity-90 text-white text-sm font-bold rounded-xl transition duration-200">
                      Regresar
                    </div>
                  </Link>
                </button>
              </li>
            </div>
          </h1>
        </div>
      </div>
    </div><Footer /></>
  );  
};

export default ViewProfile;


