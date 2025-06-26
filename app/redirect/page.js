'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem('userRol');

    if (rol === 'admin') {
      router.push('/dashboard');
    } else if (rol === 'entrenador') {
      router.push('/entrenamientos');
    } else {
      router.push('/usuario'); // jugador, visitante, etc.
    }
  }, [router]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Redireccionando según tu rol...</h2>
    </div>
  );
}
