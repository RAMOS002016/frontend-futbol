'use client';
import { useEffect, useState } from 'react';

export default function AsistenciasPage() {
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    fetch('https://backend-futbol.onrender.com/asistencias')
      .then(res => res.json())
      .then(setAsistencias);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Registro de Asistencias</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {asistencias.map(a => (
          <div key={a.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <p><strong>Jugador ID:</strong> {a.jugadorId}</p>
            <p><strong>Fecha:</strong> {new Date(a.fecha).toLocaleDateString()}</p>
            <p><strong>Presente:</strong> {a.presente ? '✅' : '❌'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
