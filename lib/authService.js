'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cerrarSesion } from '@/lib/authService';

export default function DashboardPage() {
  const router = useRouter();
  const [rol, setRol] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const userRol = localStorage.getItem('userRol');
    const userEmail = localStorage.getItem('userEmail');

    if (!userRol || !userEmail) {
      router.push('/login');
    } else {
      setRol(userRol);
      setEmail(userEmail);
    }
  }, []);

  if (!rol || !email) {
    return <p>Cargando panel...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de usuario</h1>
      <p>Bienvenido <strong>{email}</strong></p>
      <p>Tu rol: <strong>{rol}</strong></p>

      <hr />

      {rol === 'admin' && (
        <>
          <h2>Panel de Administración</h2>
          <ul>
            <li><a href="/jugadores">Gestionar Jugadores</a></li>
            <li><a href="/entrenadores">Gestionar Entrenadores</a></li>
            <li><a href="/entrenamientos">Gestionar Entrenamientos</a></li>
            <li><a href="/asistencias">Gestionar Asistencias</a></li>
            <li><a href="/usuarios">Ver Usuarios</a></li>
          </ul>
        </>
      )}

      {rol === 'entrenador' && (
        <>
          <h2>Panel de Entrenador</h2>
          <ul>
            <li><a href="/entrenamientos">Mis Entrenamientos</a></li>
            <li><a href="/asistencias">Registrar Asistencias</a></li>
          </ul>
        </>
      )}

      {rol === 'jugador' && (
        <>
          <h2>Panel de Jugador</h2>
          <ul>
            <li><a href="/entrenamientos">Ver Entrenamientos</a></li>
            <li><a href="/asistencias">Mi Asistencia</a></li>
          </ul>
        </>
      )}

      <br />
      <button onClick={() => {
        cerrarSesion();
        router.push('/login');
      }}>
        Cerrar sesión
      </button>
    </div>
  );
}

