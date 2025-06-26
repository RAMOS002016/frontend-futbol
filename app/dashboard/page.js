'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    const email = localStorage.getItem('userEmail');

    if (!email || rol !== 'admin') {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Panel del Administrador</h1>
        <p className="text-gray-700 mb-6">Desde aquí puedes gestionar jugadores, entrenadores, asistencias y entrenamientos.</p>
        <div className="grid grid-cols-2 gap-6">
          <a href="/jugadores" className="block bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600">Gestión de Jugadores</a>
          <a href="/entrenadores" className="block bg-green-500 text-white p-4 rounded-md hover:bg-green-600">Gestión de Entrenadores</a>
          <a href="/entrenamientos" className="block bg-yellow-500 text-white p-4 rounded-md hover:bg-yellow-600">Programar Entrenamientos</a>
          <a href="/asistencias" className="block bg-purple-500 text-white p-4 rounded-md hover:bg-purple-600">Control de Asistencias</a>
        </div>
      </div>
    </div>
  );
}