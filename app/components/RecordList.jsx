"use client";

import { useState, useEffect } from "react";
import ExportButtons from "./ExportButtons";

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2000-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  const fetchRecords = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/records`);
    const data = await res.json();
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = records.filter((r) => {
    const d = new Date(r.date);
    return d >= startDate && d <= endDate;
  });

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 border border-gray-100 mt-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Historial de Registros
        </h3>

        {/* Filtro por fechas */}
        <div className="flex gap-2 flex-wrap">
          <input
            type="date"
            className="border px-3 py-1 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
            value={startDate.toISOString().split("T")[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <input
            type="date"
            className="border px-3 py-1 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
            value={endDate.toISOString().split("T")[0]}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mb-4">
        <ExportButtons
          records={records}
          startDate={startDate}
          endDate={endDate}
        />
      </div>

      {/* Lista responsive */}
      <div className="flex flex-col gap-3">
        {filteredRecords.length === 0 && (
          <p className="text-gray-500 text-center">
            No hay registros para este rango de fechas.
          </p>
        )}

        {/* Modo card (mobile) */}
        <div className="sm:hidden flex flex-col gap-3">
          {filteredRecords.map((r) => (
            <div
              key={r._id}
              className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <p className="text-gray-600 text-sm">
                {new Date(r.date).toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="font-medium">Sistólica: {r.systolic}</span>
                <span className="font-medium">Diastólica: {r.diastolic}</span>
                <span>Pulso: {r.pulse || "-"}</span>
              </div>
              {r.notes && (
                <p className="text-gray-600 mt-1">Notas: {r.notes}</p>
              )}
            </div>
          ))}
        </div>

        {/* Modo tabla (desktop) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b">Fecha</th>
                <th className="px-4 py-2 border-b">Sistólica</th>
                <th className="px-4 py-2 border-b">Diastólica</th>
                <th className="px-4 py-2 border-b">Pulso</th>
                <th className="px-4 py-2 border-b">Notas</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="px-4 py-2">
                    {new Date(r.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 font-medium">{r.systolic}</td>
                  <td className="px-4 py-2 font-medium">{r.diastolic}</td>
                  <td className="px-4 py-2">{r.pulse || "-"}</td>
                  <td className="px-4 py-2 text-gray-600">{r.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
