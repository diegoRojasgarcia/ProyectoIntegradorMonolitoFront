// SobreNosotros.tsx
"use client";

import React from 'react';
import NavBar from "@/components/NavBar";

const AbutUs: React.FC = () => {
  return (
    <><NavBar /><div className="pt-2 min-h-screen bg-[url('../../public/images/loginbackground2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center">
          <div className="w-full max-w-3xl p-10 bg-white bg-opacity-90 rounded-lg shadow-md overflow-y-auto"> {/* Ajuste de ancho y opacidad */}
              <h1 className="text-4xl font-bold mb-6 text-center">Sobre Nosotros</h1>

              <h2 className="text-2xl font-semibold mb-4 text-center">Burger Delight</h2>

              <section className="mb-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Misión</h3>
                  <p className="text-gray-700">Brindar a nuestros clientes la experiencia de saborear las hamburguesas más auténticas y deliciosas, preparadas con ingredientes de alta calidad y servidas en un ambiente amigable y acogedor.</p>
              </section>

              <section className="mb-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Visión</h3>
                  <p className="text-gray-700">Ser reconocidos en la región como el destino predilecto para los amantes de las hamburguesas, innovando constantemente en nuestros sabores y garantizando siempre la satisfacción total de nuestros clientes.</p>
              </section>

              <section className="mb-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Valores</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                      <li>Pasión: Ponemos nuestro corazón en cada hamburguesa que preparamos.</li>
                      <li>Calidad: Utilizamos solo los mejores ingredientes, garantizando frescura y sabor en cada plato.</li>
                      <li>Integridad: Actuamos con honestidad, transparencia y respeto hacia nuestros clientes y empleados.</li>
                      <li>Innovación: Constantemente buscamos nuevas maneras de deleitar el paladar de nuestros clientes.</li>
                      <li>Comunidad: Estamos comprometidos en apoyar y ser una parte activa de nuestra comunidad local.</li>
                  </ul>
              </section>

              <section className="mb-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Ubicación</h3>
                  <p className="text-gray-700">Estamos situados en el corazón de Cquimbo, en Av El Sauce #2023.</p>
              </section>

              <section className="mb-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Historia</h3>
                  <p className="text-gray-700">Burger Delight nació en junio del 2023 de la mano de un grupo de informáticos apasionados por la tecnología y, sorprendentemente, por la cocina. Gonzalo Honores, el líder del grupo, decidió unir fuerzas con sus colegas para fusionar la precisión de la programación con el arte de cocinar. Lo que comenzó como un pequeño proyecto en los fines de semana, rápidamente se transformó en una pasión. Con el respaldo de una familia dedicada y un equipo de trabajo excepcional, hemos logrado convertirnos en un punto de referencia para todos los amantes de las hamburguesas en Coquimbo.</p>
              </section>
          </div>
      </div></>
  );
};

export default AbutUs;



