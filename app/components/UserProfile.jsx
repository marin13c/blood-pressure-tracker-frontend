"use client";
import { useEffect, useState } from "react";

export default function UserProfile({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="p-4 border rounded bg-gray-50">
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          onLogout();
        }}
        className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
