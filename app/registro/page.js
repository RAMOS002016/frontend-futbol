'use client';

import { useState } from 'react';
import { registrarUsuario } from '../../lib/authService';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      await registrarUsuario(email, password);
      alert('Usuario registrado correctamente');
    } catch (error) {
      alert('Error al registrar usuario: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="email"
          placeholder="Correo electrónico"
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
