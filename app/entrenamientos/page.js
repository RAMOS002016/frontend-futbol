'use client';

import { useEffect, useState } from 'react';

export default function Entrenamientos() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    entrenador: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/entrenamientos')
      .then(res => res.json())
      .then(data => setEntrenamientos(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/entrenamientos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const nuevo = await res.json();
      setEntrenamientos([...entrenamientos, nuevo]);
      setForm({ titulo: '', descripcion: '', fecha: '', entrenador: '' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Entrenamientos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" placeholder="Título" value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })} required /> <br />
        <textarea placeholder="Descripción" value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })} required /> <br />
        <input type="datetime-local" value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })} required /> <br />
        <input type="text" placeholder="Entrenador a cargo" value={form.entrenador}
          onChange={(e) => setForm({ ...form, entrenador: e.target.value })} required /> <br />
        <button type="submit">Registrar entrenamiento</button>
      </form>

      <h2>Listado</h2>
      <ul>
        {entrenamientos.map((e) => (
          <li key={e.id}>
            <strong>{e.titulo}</strong> – {e.descripcion} – {new Date(e.fecha).toLocaleString()} – {e.entrenador}
          </li>
        ))}
      </ul>
    </div>
  );
}
