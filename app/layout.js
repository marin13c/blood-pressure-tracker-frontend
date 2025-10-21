"use client";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans m-0 p-0 min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-start py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
