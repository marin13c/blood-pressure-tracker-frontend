"use client";

import { useState } from "react";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        Control de Presión Arterial
      </h1>

      <div className="w-full max-w-3xl flex flex-col gap-6 md:gap-8">
        {/* Formulario */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Registrar Nuevo Registro
          </h2>
          <RecordForm onAdd={() => setRefresh(!refresh)} />
        </div>

        {/* Lista de registros */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Lista de Registros
          </h2>
          <RecordList key={refresh} />
        </div>
      </div>
    </div>
  );
}
