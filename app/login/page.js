'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      // 🔐 Login con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario autenticado con Firebase:", user.email);

      // 🔁 Validar en el backend
      const res = await fetch(`https://backend-futbol.onrender.com/usuarios?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        alert("✅ Usuario autenticado, pero no existe en la base de datos");
      } else {
        const rol = data[0].rol;

        // 🔒 Guardar datos en localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRol', rol);

        alert(`Bienvenido ${rol}`);
        router.push('/usuario'); // Redirigir a la página de usuario
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas o error al conectarse.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={iniciarSesion}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

