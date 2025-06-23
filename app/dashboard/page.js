'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { cerrarSesion } from '../../lib/authService';

export default function Dashboard() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !usuario) {
      router.push('/login'); // Redirige si no está logueado
    }
  }, [usuario, cargando, router]);

  if (cargando) return <p>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Área privada: Dashboard</h1>
      <p>Bienvenido, {usuario.email}</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}

