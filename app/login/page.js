'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Paso 1: Autenticarse con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Paso 2: Consultar al backend si el usuario existe y obtener su rol
      const res = await fetch(`https://backend-futbol.onrender.com/usuarios?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        alert("Usuario autenticado pero no existe en la base de datos.");
        return;
      }

      const rol = data[0].rol;

      // Paso 3: Guardar en localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRol', rol);

      // Paso 4: Redirigir según el rol
      router.push('/redirect');

    } catch (err) {
      console.error(err);
      setError('Correo o contraseña inválidos');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
