// frontend/lib/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Función para registrar usuario en Firebase y en tu backend
export const registrarUsuario = async (email, password) => {
  // 1. Registrar en Firebase
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // 2. Registrar también en el backend (base de datos PostgreSQL)
  await fetch('http://localhost:4000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: email.split('@')[0], // Extrae nombre desde email como ejemplo
      email: email,
      password: password,          // Para producción usar encriptación (bcrypt)
      rol: "usuario"
    })
  });

  return userCredential;
};

// Función para iniciar sesión con Firebase
export const iniciarSesion = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const cerrarSesion = async () => {
  return await signOut(auth);
};

