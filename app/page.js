import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bienvenido al Sistema Escuela de Fútbol</h1>
      <p>Selecciona una opción:</p>
      <ul style={{ lineHeight: '2' }}>
        <li><Link href="/registro"> Registrarse</Link></li>
        <li><Link href="/login"> Iniciar sesión</Link></li>
      </ul>
    </div>
  );
}
