'use client';

import { useEffect, useState } from 'react';

export default function EntrenamientosPage() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [entrenador, setEntrenador] = useState('');
  const [error, setError] = useState('');
  const backendURL = 'https://backend-futbol.onrender.com';

  const fetchEntrenamientos = async () => {
    try {
      const res = await fetch(`${backendURL}/entrenamientos`);
      const data = await res.json();
      setEntrenamientos(data);
    } catch (err) {
      setError('Error al cargar entrenamientos');
    }
  };

  useEffect(() => {
    fetchEntrenamientos();
  }, []);

  const crearEntrenamiento = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${backendURL}/entrenamientos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, fecha, entrenador }),
      });
      if (!res.ok) throw new Error('Error al crear entrenamiento');
      setTitulo('');
      setDescripcion('');
      setFecha('');
      setEntrenador('');
      fetchEntrenamientos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Entrenamientos</h1>

      <form onSubmit={crearEntrenamiento} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Entrenador"
          value={entrenador}
          onChange={(e) => setEntrenador(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {entrenamientos.map((ent) => (
          <li key={ent.id}>
            <strong>{ent.titulo}</strong> - {ent.descripcion} ({new Date(ent.fecha).toLocaleDateString()}) - Entrenador: {ent.entrenador}
          </li>
        ))}
      </ul>
    </div>
  );
}
