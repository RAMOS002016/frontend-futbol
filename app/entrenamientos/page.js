'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function EntrenamientosPage() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedRol = localStorage.getItem('userRol');

    if (!storedEmail || !['admin', 'entrenador'].includes(storedRol)) {
      router.push('/login');
    } else {
      setEmail(storedEmail);
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Entrenamientos</h1>
        <p>Bienvenido, {email}</p>
        <p>Aquí puedes ver y gestionar los entrenamientos programados.</p>
      </div>
    </>
  );
}
