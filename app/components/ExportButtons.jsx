"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { FileSpreadsheet, FileText } from "lucide-react";

export default function ExportButtons({ records, startDate, endDate, user }) {
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d)) return null;
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Presión Arterial");

    sheet.columns = [
      { header: "Fecha", key: "date", width: 20 },
      { header: "Sistólica", key: "systolic", width: 15 },
      { header: "Diastólica", key: "diastolic", width: 15 },
      { header: "Pulso", key: "pulse", width: 10 },
      { header: "Notas", key: "notes", width: 25 },
    ];

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const filtered = records.filter((r) => {
      const d = formatDate(r.date);
      if (!d) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });

    filtered.forEach((r) => {
      sheet.addRow({
        date: new Date(r.date).toLocaleString(),
        systolic: r.systolic,
        diastolic: r.diastolic,
        pulse: r.pulse || "",
        notes: r.notes || "",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presion-arterial.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const start = formatDate(new Date(startDate));
    const end = formatDate(new Date(endDate));

    const filtered = records.filter((r) => {
      const d = formatDate(new Date(r.date));
      if (!d) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });

    // Encabezado
    doc.setFontSize(16);
    doc.text("Historial de Presión Arterial", 14, 20);
    doc.setFontSize(11);
    const fechaRango = `${start || "-"} - ${end || "-"}`;
    doc.text(`Rango de fechas: ${fechaRango}`, 14, 28);
    doc.text(`Usuario: ${user?.name || "-"}`, 14, 36);
    doc.text(`Total registros: ${filtered.length}`, 14, 44);

    // Tabla
    const tableData = filtered.map((r) => [
      new Date(r.date).toLocaleString(),
      r.systolic,
      r.diastolic,
      r.pulse || "-",
      r.notes || "-",
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Fecha", "Sistólica", "Diastólica", "Pulso", "Notas"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [200, 200, 200] },
    });

    const today = new Date().toISOString().split("T")[0];
    doc.save(`presion-arterial-${today}.pdf`);
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={exportExcel}
        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
      >
        <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
      </button>
      <button
        onClick={exportPDF}
        className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
      >
        <FileText className="w-4 h-4" /> Exportar PDF
      </button>
    </div>
  );
}
