import { CreateLineProduct } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";

function ModalLineProduct({ closeModalCreate, crearLineProduct }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLineProduct>();

  const onSubmit = handleSubmit(async (data) => {
    crearLineProduct(data);
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
              <img
                className="h-auto max-w-full rounded-lg "
                src="https://tecdn.b-cdn.net/img/new/standard/city/041.jpg"
                alt="Sunset in the mountains"
              ></img>
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div className="relative p-6 flex-auto">
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    {...register("cantidad", { required: true })}
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.cantidad && <span>Field is a required</span>}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b mt-6">
                  <button
                    className="bg-cyan-100 text-black active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="submit"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => closeModalCreate(false)}
                    className="bg-gray-900 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-6"
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalLineProduct;
