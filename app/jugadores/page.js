'use client';

import { useEffect, useState } from 'react';

export default function JugadoresPage() {
  const [jugadores, setJugadores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipo, setEquipo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const backendURL = 'https://backend-futbol.onrender.com';

  // Obtener jugadores
  const fetchJugadores = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${backendURL}/jugadores`);
      const data = await res.json();
      setJugadores(data);
    } catch (err) {
      setError('Error al cargar jugadores');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchJugadores();
  }, []);

  // Crear jugador
  const crearJugador = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/jugadores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad, posicion, equipo }),
      });
      if (!res.ok) throw new Error('Error al crear jugador');
      setNombre('');
      setEdad('');
      setPosicion('');
      setEquipo('');
      fetchJugadores();
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar jugador
  const eliminarJugador = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este jugador?')) return;
    try {
      await fetch(`${backendURL}/jugadores/${id}`, { method: 'DELETE' });
      fetchJugadores();
    } catch (err) {
      setError('Error al eliminar jugador');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Jugadores</h1>

      <form onSubmit={crearJugador} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Posición"
          value={posicion}
          onChange={(e) => setPosicion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Equipo"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      {cargando && <p>Cargando jugadores...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {jugadores.map((jugador) => (
          <li key={jugador.id}>
            {jugador.nombre} - {jugador.posicion} - {jugador.equipo} ({jugador.edad} años)
            <button onClick={() => eliminarJugador(jugador.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
