'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path) =>
    pathname === path
      ? 'text-white bg-blue-700 px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-white font-bold text-xl">Escuela Fútbol</Link>
            <Link href="/dashboard" className={linkClasses('/dashboard')}>Dashboard</Link>
            <Link href="/entrenamientos" className={linkClasses('/entrenamientos')}>Entrenamientos</Link>
            <Link href="/jugadores" className={linkClasses('/jugadores')}>Jugadores</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className={linkClasses('/login')}>Login</Link>
            <Link href="/registro" className={linkClasses('/registro')}>Registro</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <nav style={{
      background: '#02165a',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>Sistema Escuela Fútbol</h3>
      <div>
        {email && <span style={{ marginRight: '1rem' }}>👤 {email}</span>}
        <button
          onClick={handleLogout}
          style={{
            background: '#f0c506',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
