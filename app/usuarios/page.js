'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function UsuarioPage() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedRol = localStorage.getItem('userRol');

    if (!storedEmail) {
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
        <h1>Perfil del Usuario</h1>
        <p>Bienvenido, {email}</p>
        <p>Aquí puedes ver y editar tu perfil personal.</p>
      </div>
    </>
  );
}
