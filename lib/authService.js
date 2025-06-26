// frontend/lib/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Registrar usuario en Firebase y también en tu backend (PostgreSQL).
 */
export const registrarUsuario = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  await fetch('https://backend-futbol.onrender.com/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: email.split('@')[0], // nombre extraído del email como ejemplo
      email,
      password,
      rol: "usuario"
    })
  });

  return userCredential;
};

/**
 * Iniciar sesión con Firebase.
 */
export const iniciarSesion = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Cerrar sesión en Firebase + limpiar localStorage + redirigir.
 */
export const cerrarSesion = async () => {
  await signOut(auth);                          // Cierra sesión Firebase
  localStorage.removeItem("userEmail");         // Borra datos locales
  localStorage.removeItem("userRol");
  window.location.href = "/login";              // Redirige al login
};

