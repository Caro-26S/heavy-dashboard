'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboard.store';

interface DashboardClientProps {
  initialData: {
    users: number;
    sales: number;
  };
  fromCache: boolean;
}

export default function DashboardClient({ initialData, fromCache }: DashboardClientProps) {
  const { data, setData, loading } = useDashboardStore();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="mt-4">
      <p>Usuarios: {data.users}</p>
      <p>Ventas: {data.sales}</p>
      <p className="text-sm text-gray-500">
        {fromCache ? 'Desde cache' : 'Calculado'}
      </p>
    </div>
  );
}
