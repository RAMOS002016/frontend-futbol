'use client';
import { useEffect, useState } from 'react';

export default function JugadoresPage() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetch('https://backend-futbol.onrender.com/jugadores')
      .then(res => res.json())
      .then(setJugadores);
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Listado de Jugadores</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {jugadores.map(j => (
          <div key={j.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{j.nombre}</h2>
            <p className="text-gray-700">Edad: {j.edad}</p>
            <p className="text-gray-700">Posición: {j.posicion}</p>
            <p className="text-gray-700">Equipo: {j.equipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
