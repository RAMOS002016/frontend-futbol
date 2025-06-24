'use client'
import { useEffect, useState } from "react";

export default function UsuarioPage() {
  const [rol, setRol] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Recupera los datos del usuario desde localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userRol = localStorage.getItem('userRol');
    setEmail(userEmail);
    setRol(userRol);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenido, {email || "Usuario"}!</h1>
      <p>Tu rol asignado es: <strong>{rol}</strong></p>
    </div>
  );
}
