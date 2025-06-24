'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function UsuarioPage() {
  const router = useRouter();
  const [rol, setRol] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const userRol = localStorage.getItem('userRol');

    // Si no hay sesión → redirige al login
    if (!userEmail || !userRol) {
      router.push('/login');
    } else {
      setEmail(userEmail);
      setRol(userRol);
    }
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth); // Cierra sesión de Firebase
      localStorage.clear(); // Limpia el almacenamiento local
      router.push('/login'); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error cerrando sesión");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido, {email || "Usuario"}!</h1>
      <p>Tu rol asignado es: <strong>{rol}</strong></p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
}
