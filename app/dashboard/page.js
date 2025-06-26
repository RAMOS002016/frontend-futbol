'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; // Asegúrate de tener este archivo creado

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedRol = localStorage.getItem('userRol');

    if (!storedEmail || storedRol !== 'admin') {
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
        <h1>Panel de Administrador</h1>
        <p>Bienvenido, {email}</p>
        <p>Desde aquí puedes gestionar entrenadores, jugadores, entrenamientos y asistencia.</p>
      </div>
    </>
  );
}

