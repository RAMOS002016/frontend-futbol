'use client';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 px-6">
        <h1 className="text-2xl font-bold">Bienvenido al Panel</h1>
        <p className="text-gray-600">Administra tu escuela de fútbol aquí.</p>
      </div>
    </>
  );
}
