import React, { useState } from 'react';
import ShoppingCarts from './ShoppingCarts';

const ButtonCars: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleOpenModal = () => {
        setIsCartOpen(true);
    };

    const handleCloseModal = () => {
        setIsCartOpen(false);
    };


    return (
        <div className="rounded-fullr">
          <button onClick={handleOpenModal} className="bg-gray-800 text-white rounded-full p-4 hover:bg-gray-700 transition duration-300 shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"          
                fill="currentColor"
                className="h-5 w-5"
                >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </button>
      
          {isCartOpen && <ShoppingCartModal onClose={() => setIsCartOpen(false)} />}
        </div>
      );
      
}

interface ShoppingCartModalProps {
  onClose: () => void;
}

const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ onClose }) => {
    return (
        <div className="fixed top- left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-4 w-1/2">
                <ShoppingCarts />

                <button onClick={onClose} className="mt-4 bg-black text-white p-2 rounded">
                    Cerrar Carrito
                </button>
            </div>
        </div>
    );
}
export default ButtonCars;