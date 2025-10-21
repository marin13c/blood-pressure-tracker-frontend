"use client";
import { useState } from "react";
import { HeartPulse, ActivitySquare, ClipboardPlus } from "lucide-react";

export default function RecordForm({ onAdd }) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        pulse: pulse ? Number(pulse) : undefined,
        notes,
      }),
    });

    setSystolic("");
    setDiastolic("");
    setPulse("");
    setNotes("");
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 space-y-6 border border-gray-100 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <ClipboardPlus className="text-blue-600 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Nuevo registro de presión
        </h3>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 font-medium flex items-center gap-1 mb-1">
            <HeartPulse className="w-4 h-4 text-blue-500" />
            Sistólica
          </label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            required
            placeholder="120"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium flex items-center gap-1 mb-1">
            <HeartPulse className="w-4 h-4 text-red-500" />
            Diastólica
          </label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            required
            placeholder="80"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium flex items-center gap-1 mb-1">
            <ActivitySquare className="w-4 h-4 text-green-600" />
            Pulso (opcional)
          </label>
          <input
            type="number"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="72"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium mb-1">
            Notas
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: Después de ejercicio"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 rounded-lg transition shadow-md"
      >
        Guardar
      </button>
    </form>
  );
}
