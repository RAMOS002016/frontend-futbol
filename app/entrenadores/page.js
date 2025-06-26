'use client';

import { useEffect, useState } from 'react';

export default function EntrenadoresPage() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const backendURL = 'https://backend-futbol.onrender.com';

  // Obtener entrenadores
  const fetchEntrenadores = async () => {
    try {
      const res = await fetch(`${backendURL}/entrenadores`);
      const data = await res.json();
      setEntrenadores(data);
    } catch (err) {
      setError('Error al cargar entrenadores');
    }
  };

  useEffect(() => {
    fetchEntrenadores();
  }, []);

  // Crear entrenador
  const crearEntrenador = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${backendURL}/entrenadores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, especialidad, telefono }),
      });
      if (!res.ok) throw new Error('Error al crear entrenador');
      setNombre('');
      setEspecialidad('');
      setTelefono('');
      fetchEntrenadores();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Entrenadores</h1>

      <form onSubmit={crearEntrenador} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {entrenadores.map((entrenador) => (
          <li key={entrenador.id}>
            {entrenador.nombre} - {entrenador.especialidad} - {entrenador.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}
