'use client';

import { useEffect, useState } from 'react';

export default function Asistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [form, setForm] = useState({
    jugadorId: '',
    fecha: '',
    presente: true
  });

  useEffect(() => {
    fetch("https://backend-futbol.onrender.com/asistencias")
      .then(res => res.json())
      .then(data => setAsistencias(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/asistencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jugadorId: Number(form.jugadorId),
        fecha: form.fecha,
        presente: form.presente
      })
    });

    if (res.ok) {
      const nueva = await res.json();
      setAsistencias([...asistencias, nueva]);
      setForm({ jugadorId: '', fecha: '', presente: true });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Registro de Asistencia</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="number" placeholder="ID del jugador" value={form.jugadorId}
          onChange={(e) => setForm({ ...form, jugadorId: e.target.value })} required /> <br />
        <input type="datetime-local" value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })} required /> <br />
        <label>
          <input
            type="checkbox"
            checked={form.presente}
            onChange={(e) => setForm({ ...form, presente: e.target.checked })}
          /> Asistió
        </label> <br />
        <button type="submit">Registrar asistencia</button>
      </form>

      <h2>Listado</h2>
      <ul>
        {asistencias.map((a) => (
          <li key={a.id}>
            Jugador ID: {a.jugadorId} – {a.presente ? 'Presente' : 'Ausente'} – {new Date(a.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
