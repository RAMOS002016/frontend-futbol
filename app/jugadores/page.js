'use client';

import { useEffect, useState } from 'react';

export default function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [form, setForm] = useState({ nombre: '', edad: '', posicion: '', equipo: '' });

  // Cargar lista de jugadores
  useEffect(() => {
    fetch("https://backend-futbol.onrender.com/jugadores")
      .then(res => res.json())
      .then(data => setJugadores(data));
  }, []);

  // Crear jugador
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://backend-futbol.onrender.com/jugadores", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const nuevo = await res.json();
      setJugadores([...jugadores, nuevo]);
      setForm({ nombre: '', edad: '', posicion: '', equipo: '' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Jugadores</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" placeholder="Nombre" value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /> <br />
        <input type="number" placeholder="Edad" value={form.edad}
          onChange={(e) => setForm({ ...form, edad: e.target.value })} required /> <br />
        <input type="text" placeholder="Posición" value={form.posicion}
          onChange={(e) => setForm({ ...form, posicion: e.target.value })} required /> <br />
        <input type="text" placeholder="Equipo" value={form.equipo}
          onChange={(e) => setForm({ ...form, equipo: e.target.value })} required /> <br />
        <button type="submit">Registrar jugador</button>
      </form>

      <h2>Listado</h2>
      <ul>
        {jugadores.map((j) => (
          <li key={j.id}>
            {j.nombre} – {j.posicion} – {j.edad} años – {j.equipo}
          </li>
        ))}
      </ul>
    </div>
  );
}


