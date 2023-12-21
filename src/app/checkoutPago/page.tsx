"use client";
import React, {useEffect,useState} from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { gql, useMutation } from '@apollo/client';

const VALIDACION_TRANSACCION = gql`
mutation validateTransaccion($input: ValidateTransaccionInput!) {
    validateTransaccion(validateTransaccionInput: $input) {
      status,     
      error,     
      statustrx,     
      responseCode   
    } 
  }
`;

const CheckoutPage = () => {
    const [validateTransaccion, { data, loading, error }] = useMutation(VALIDACION_TRANSACCION);
    const [transactionStatus, setTransactionStatus] = useState('');
    const [paymentToken, setPaymentToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("paymentToken");
        if (token) {
          setPaymentToken(token);
          validateTransaccion({ variables: { input: { token } } });
          console.log(token)
        }
      }, [validateTransaccion]); 
    
      useEffect(() => {
        if (data && data.validateTransaccion) {
          setTransactionStatus(data.validateTransaccion.error);
        }
      }, [data]);
   
    
  return (
    <>
      <NavBar />
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Pago </h3>
            <p className="text-gray-600 my-2">La transaccion fue { transactionStatus}</p>
            <p>Ten un gran día!</p>
            <div className="py-10 text-center">
              <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                GO BACK
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;