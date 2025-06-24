"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Asegúrate que esta ruta sea la correcta
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Validar si existe en tu base de datos y obtener el rol
      const res = await fetch(`https://backend-futbol.onrender.com/usuarios?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        alert("Usuario autenticado, pero no está registrado en la base de datos.");
      } else {
        const rol = data[0].rol;
        // Puedes guardar el rol en localStorage, contexto, o redirigir según rol
        localStorage.setItem("rol", rol);
        alert(`Bienvenido ${rol}`);

        // Redirigir si quieres
        router.push("/dashboard");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
}
