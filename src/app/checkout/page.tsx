// /src/app/detalle_producto/checkout.tsx
import React from 'react';

const page = () => {
  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Resumen de compra<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
            <form action="" className="mt-10 flex flex-col space-y-4">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-xs font-semibold text-gray-500">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Felipe Andree Duarte Valdes"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="correo" className="text-xs font-semibold text-gray-500">Correo</label>
                <input
                  type="text"
                  id="correo"
                  name="correo"
                  placeholder="felipeduarte@gmail.com"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div >
              <label htmlFor="billing-address"  className="mb-4 text-xs font-semibold text-gray-500">Dirección</label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12 mb-4 sm:mb-0">
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    placeholder="Calle siempreviva"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg"
                      alt=""
                    />
                  </div>
                </div>
                <select
                  name="region"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                >
                  <option value="region">Región</option>
                </select>
                <input
                  type="text"
                  name="zip"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  placeholder="ZIP"
                />
              </div>
              <div>
                <label htmlFor="card-name" className="text-xs font-semibold text-gray-500">Número telefónico</label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  placeholder="+56 9 XXXX XXXX"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                  <img className="w-14 object-contain" src="https://www.tiendawebchile.cl/wp-content/uploads/2017/09/logo-webpay-plus-3-copy.png" alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Webpay</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: 30 - 60 minutos</p>
                  </div>
                </label>
              </div>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">
              Al realizar este pedido usted acepta los{' '}
              <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">
                Teminos y condiciones
              </a>
            </p>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
            >
              Realizar pedido
            </button>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Detalle de productos</h2>
          <div>
            <img src="https://i.pinimg.com/564x/81/27/9b/81279b83de87191d558576d61564f626.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img src="https://miamidiario.com/wp-content/uploads/burguer.jpg" alt="" className="max-h-16" />
                  <div className="ml-3">
                    <p className="text-base font-semibold text-white">Hamburguesa clásica</p>
                    <p className="text-sm font-medium text-white text-opacity-80">Jugosa hamburguesa de carne de res con lechuga, tomate, cebolla y salsa especial</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">$6.300</p>
              </li>
              <li className="flex justify-between">
                <div className="inline-flex">
                  <img src="https://img2.rtve.es/v/5694465?w=1600&preview=1603708747119.jpg" alt="" className="max-h-16" />
                  <div className="ml-3">
                    <p className="text-base font-semibold text-white">Hamburguesa vegetariana</p>
                    <p className="text-sm font-medium text-white text-opacity-80">Deliciosa hamburguesa vegetariana hecha de garbanzos, espinacas y queso feta, acompañada de batatas fritas.</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">$8.500</p>
              </li>
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>Precio final:</span><span>$14.700</span></p>
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Soporte</h3>
            <p className="text-sm font-semibold">+569 1234 5678</p>
            <p className="mt-1 text-sm font-semibold">soporte@bobburger.com <span className="font-light">(Correo)</span></p>
            <p className="mt-2 text-xs font-medium">Llamanos en caso de dudas o problemas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
  



