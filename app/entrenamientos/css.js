'use client';
import { useEffect, useState } from 'react';

export default function EntrenamientosPage() {
  const [entrenamientos, setEntrenamientos] = useState([]);

  useEffect(() => {
    fetch('https://backend-futbol.onrender.com/entrenamientos')
      .then(res => res.json())
      .then(setEntrenamientos);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">Entrenamientos</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {entrenamientos.map(ent => (
          <div key={ent.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{ent.titulo}</h2>
            <p className="text-gray-700">{ent.descripcion}</p>
            <p className="text-sm text-gray-500">Fecha: {new Date(ent.fecha).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
