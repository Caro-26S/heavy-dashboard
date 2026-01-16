// app/dashboard/DashboardClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../lib/socketClient';
import { useDashboardStore } from '../../store/dashboard.store';
import type { DashboardData } from '../../types/dashboard';

type DashboardClientProps = {
  initialData: DashboardData;
  fromCache: boolean;
};

export default function DashboardClient({
  initialData,
  fromCache,
}: DashboardClientProps) {
  const { data, setData } = useDashboardStore();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    setData(initialData);

    fetch('/api/socket'); // inicializa socket server
    socket.connect();

    socket.on('progress', (value: number) => {
      setProgress(value);
    });

    socket.on('done', (newData: DashboardData) => {
      setData(newData);
      setProgress(null);
    });

    return () => {
      socket.off('progress');
      socket.off('done');
      socket.disconnect();
    };
  }, [initialData, setData]);

  if (!data) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {/* INFO DE CACHE */}
      <p className="text-sm text-gray-500">
        {fromCache ? 'Datos desde cache (Redis)' : 'Datos recalculados'}
      </p>

      {/* PROGRESO */}
      {progress !== null && (
        <p className="text-blue-600">
          Recalculando... {progress}%
        </p>
      )}

      {/* DATA */}
      <p>Usuarios: {data.users}</p>
      <p>Ventas: {data.sales}</p>

      {/* BOTÓN FASE 8 */}
      <button
        onClick={() =>
          fetch('/api/recalculate', { method: 'POST' })
        }
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Recalcular datos
      </button>
    </div>
  );
}
