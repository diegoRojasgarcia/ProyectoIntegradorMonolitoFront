import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import ShoppingCarts from './ShoppingCarts';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { gql, useMutation } from '@apollo/client';

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
  const [userEmailStorage, setuserEmailStorage] = React.useState("");
  const [userIdStorage, setUserIdStorage] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {

    localStorage.removeItem("emailUser");
    localStorage.removeItem("userId");
    console.log("Logged out");
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("emailUser");
    if (userEmail) {
      setuserEmailStorage(userEmail);
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserIdStorage(userId);
    }
  }, []); 

return (
  <Disclosure as="nav" className="hover:bg-gray-700">
      {({ open }) => (
         <>
    <div className="hover:bg-gray-700">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link href="/" passHref>
          <div className="cursor-pointer text-3xl font-bold leading-none ">
            <LogoSVG />
          </div>
        </Link>

        <div className="lg:hidden">
          <Disclosure.Button className="p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700">
            <span className="sr-only">Open main menu</span>
            {open ? <XMarkIcon className="gray h-6 w-6" /> : <Bars3Icon className="gray h-6 w-6" />}
          </Disclosure.Button>
        </div>

        {/* <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center p-2 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <BurgerSVG />
          </button>
        </div> */}

        <div className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
          {/* className=`transform  transition-transform duration-200 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6 ${
            isOpen
              ? "absolute top-full right-0 w-72 bg-white block py-2 z-50"
              : "hidden"
          }`} */}
          
          <div className="lg:py-0 py-2 border-b border-gray-200">
            <Link href="/" passHref>
              <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">
                Home
              </div>
            </Link>
          </div>
          <div className="lg:py-0 py-2 border-b border-gray-200">
            <Link href="/burgers" passHref>
              <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">
                Burgers
              </div>
            </Link>
          </div>
          <div className="lg:py-0 py-2 border-b border-gray-200">
            <Link href="/drinks" passHref>
              <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">
                Drinks
              </div>
            </Link>
          </div>
          <div className="lg:py-0 py-2 border-b border-gray-200">
            <Link href="/aboutUs" passHref>
              <div className="cursor-pointer block w-full text-center px-4 py-2 hover:bg-gray-100">
                About Us
              </div>
            </Link>
          </div>
        </div>
        {userEmailStorage ? (
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            as="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          show={isDropdownOpen} 
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                   <Link href={`/viewProfile?id=${encodeURIComponent(userIdStorage)}`}>
                      <div
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700`}
                      >
                        View Profile
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/burgers" passHref onClick={logout}>
                    <div className="ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                      Log Out
                    </div>
                  </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <li className="flex hidden lg:flex items-center space-x-4">
              <Link href="/login" passHref>
                <div className="ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                  Sign In
                </div>
              </Link>
            </li>
            <li className="flex hidden lg:flex items-center space-x-4">
              <Link href="/register" passHref>
                <div className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
                  Sign up
                </div>
              </Link>
            </li>
          </div>
        )}
      </nav>
      {isOpen && (
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
    <Disclosure.Panel className="lg:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" passHref>
                <div className="lg:py-0 py-2 border-b border-gray-200">Home</div>
              </Link>
              <Link href="/burgers" passHref>
                <div className="lg:py-0 py-2 border-b border-gray-200">Burgers</div>
              </Link>
              <Link href="/drinks" passHref>
                <div className="lg:py-0 py-2 border-b border-gray-200">Drinks</div>
              </Link>
              <Link href="/aboutUs" passHref>
                <div className="lg:py-0 py-2 border-b border-gray-200">About Us</div>
              </Link>
          </div>
          {userEmailStorage ? (
              <div className="px-5 pt-4 pb-3 border-t border-gray-700">
                {/* Mobile User Menu Dropdown */}
                {/* ... */}
              </div>
            ) : (
              <div className="pt-4 pb-3 border-gray-700">
                <div className="flex items-center px-5">
                <Link href="/login" passHref>
                  <div className="ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
                    Sign In
                  </div>
                </Link>
                </div>
                <div className="flex items-center px-5">
                  <Link href="/register" passHref>
                  <div className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
                   Sign up
                  </div>
                  </Link>
                </div>
              </div>
              
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
