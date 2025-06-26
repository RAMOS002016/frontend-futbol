'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Consultar backend para obtener el rol
      const res = await fetch(`https://backend-futbol.onrender.com/usuarios?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        alert('Usuario no existe en la base de datos');
        return;
      }

      const rol = data[0].rol;
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRol', rol);
      router.push('/redirect');
    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-blue-900 text-center">Iniciar sesión</h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
