'use client';

import { useState, useEffect } from 'react';

export default function AsistenciasPage() {
  const [asistencias, setAsistencias] = useState([]);
  const [jugadorId, setJugadorId] = useState('');
  const [fecha, setFecha] = useState('');
  const [presente, setPresente] = useState(true);
  const [error, setError] = useState('');
  const backendURL = 'https://backend-futbol.onrender.com';

  const fetchAsistencias = async () => {
    try {
      const res = await fetch(`${backendURL}/asistencias`);
      const data = await res.json();
      setAsistencias(data);
    } catch (err) {
      setError('Error al cargar asistencias');
    }
  };

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const registrarAsistencia = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${backendURL}/asistencias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jugadorId: parseInt(jugadorId),
          fecha,
          presente,
        }),
      });

      if (!res.ok) throw new Error('Error al registrar asistencia');

      setJugadorId('');
      setFecha('');
      setPresente(true);
      fetchAsistencias();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registro de Asistencia</h1>

      <form onSubmit={registrarAsistencia} style={{ marginBottom: '2rem' }}>
        <input
          type="number"
          placeholder="ID del Jugador"
          value={jugadorId}
          onChange={(e) => setJugadorId(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={presente}
            onChange={(e) => setPresente(e.target.checked)}
          />{' '}
          ¿Presente?
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {asistencias.map((asis) => (
          <li key={asis.id}>
            Jugador ID: {asis.jugadorId} - Fecha: {new Date(asis.fecha).toLocaleDateString()} -{' '}
            {asis.presente ? 'Presente' : 'Ausente'}
          </li>
        ))}
      </ul>
    </div>
  );
}
