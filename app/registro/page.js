'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('jugador');
  const [error, setError] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await fetch('https://backend-futbol.onrender.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password, rol })
      });

      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRol', rol);
      router.push('/redirect');
    } catch (err) {
      setError('Error al registrar: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Registro</h1>
        <form onSubmit={handleRegistro} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="jugador">Jugador</option>
            <option value="entrenador">Entrenador</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Registrarse
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}