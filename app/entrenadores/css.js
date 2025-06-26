'use client';
import { useEffect, useState } from 'react';

export default function EntrenadoresPage() {
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    fetch('https://backend-futbol.onrender.com/entrenadores')
      .then(res => res.json())
      .then(setEntrenadores);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Entrenadores</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {entrenadores.map(e => (
          <div key={e.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{e.nombre}</h2>
            <p className="text-gray-700">Especialidad: {e.especialidad}</p>
            <p className="text-gray-700">Teléfono: {e.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
