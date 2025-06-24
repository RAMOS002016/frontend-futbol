'use client';

import { useEffect, useState } from 'react';

export default function Entrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [form, setForm] = useState({ nombre: '', especialidad: '', telefono: '' });

  useEffect(() => {
    fetch("https://backend-futbol.onrender.com/entrenadores")
      .then(res => res.json())
      .then(data => setEntrenadores(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://backend-futbol.onrender.com/entrenadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const nuevo = await res.json();
      setEntrenadores([...entrenadores, nuevo]);
      setForm({ nombre: '', especialidad: '', telefono: '' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Entrenadores</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" placeholder="Nombre" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /> <br />
        <input type="text" placeholder="Especialidad" value={form.especialidad}
          onChange={(e) => setForm({ ...form, especialidad: e.target.value })} required /> <br />
        <input type="text" placeholder="Teléfono" value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })} required /> <br />
        <button type="submit">Registrar entrenador</button>
      </form>

      <h2>Listado</h2>
      <ul>
        {entrenadores.map((e) => (
          <li key={e.id}>
            {e.nombre} – {e.especialidad} – {e.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}
