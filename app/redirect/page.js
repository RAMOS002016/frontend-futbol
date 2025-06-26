'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    const email = localStorage.getItem('userEmail');

    if (!email || !rol) {
      router.push('/login'); // Si no está logueado, redirige a login
      return;
    }

    // Redirección según rol
    if (rol === 'admin') {
      router.push('/dashboard');
    } else if (rol === 'jugador') {
      router.push('/jugadores');
    } else if (rol === 'entrenador') {
      router.push('/entrenamientos');
    } else {
      router.push('/login'); // Por si el rol no es reconocido
    }
  }, [router]);

  return (
    <div style={{ padding: '2rem' }}>
      <p>Redirigiendo...</p>
    </div>
  );
}
