'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RegistroPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('jugador'); // valor por defecto
  const [error, setError] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Paso 1: Crear cuenta con Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Paso 2: Registrar usuario en tu base de datos
      const res = await fetch('https://backend-futbol.onrender.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol })
      });

      if (!res.ok) {
        throw new Error('Error al registrar en la base de datos');
      }

      // Paso 3: Guardar sesión local
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRol', rol);

      // Paso 4: Redirigir según rol
      router.push('/redirect');

    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registro</h1>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        /><br /><br />
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
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="jugador">Jugador</option>
          <option value="entrenador">Entrenador</option>
          <option value="admin">Administrador</option>
        </select><br /><br />
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

