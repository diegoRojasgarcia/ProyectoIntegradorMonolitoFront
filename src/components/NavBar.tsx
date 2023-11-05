import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCarts from './ShoppingCarts';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }
  
const LogoSVG: React.FC = () => (
  <img src="/images/logohamburguesa.png" alt="Logo" className="w-12 h-12" />
);

const BurgerSVG: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M2 5a1 1 0 011-1h16a1 1 0 110 2H3a1 1 0 01-1-1zM2 10a1 1 0 011-1h16a1 1 0 110 2H3a1 1 0 01-1-1zM3 15a1 1 0 100 2h16a1 1 0 100-2H3z" clipRule="evenodd" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blue-500">
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
            <Link href="/" passHref>
              <div className="cursor-pointer text-3xl font-bold leading-none">
                <LogoSVG />
              </div>
            </Link>
            <div className="lg:hidden">
            <button onClick={toggleMenu} className="flex items-center p-2 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              <BurgerSVG />
            </button>
            </div>
            {/* <ul className={`transform transition-transform duration-200 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ${isOpen ? 'absolute top-full right-0 w-50 bg-white block py-2 z-50' : 'hidden'}`}> */}
            <ul className={`transform transition-transform duration-200 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ${isOpen ? 'absolute top-full right-0 w-72 bg-white block py-2 z-50' : 'hidden'}`}>
            <li className="lg:py-0 py-2 border-b border-gray-200">
                <Link href="/" passHref>
                    <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">Home</div>
                </Link>
            </li>
            <li className="lg:py-0 py-2 border-b border-gray-200">
                <Link href="/burgers" passHref>
                    <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">Burgers</div>
                </Link>
            </li>
            <li className="lg:py-0 py-2 border-b border-gray-200">
                <Link href="/drinks" passHref>
                    <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">Drinks</div>
                </Link>
            </li>
            <li className="lg:py-0 py-2 border-b border-gray-200">
                <Link href="/aboutUs" passHref>
                    <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">About Us</div>
                </Link>
            </li>
            </ul>

  
            <div className="flex hidden lg:flex items-center space-x-4">
            <li className="flex hidden lg:flex items-center space-x-4">
                <Link href="/login" passHref>
                    <div className="ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">Sign In</div>
                </Link>   
            </li>  
            <li className="flex hidden lg:flex items-center space-x-4">
                <Link href="/register" passHref>
                    <div className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Sign up</div> 
                </Link>
            </li>
             </div>


        </nav>
        {isOpen && 
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 z-40" onClick={toggleMenu}></div>
        }
    </div>
  );
}

export default Navbar;