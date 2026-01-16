// src/app/dashboard/DashboardClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../lib/socketClient';
import { useDashboardStore } from '../../store/dashboard.store';
import type { DashboardData } from '../../types/dashboard';

type DashboardClientProps = {
  initialData: DashboardData;
};


export default function DashboardClient({ initialData }: DashboardClientProps) {
  const { data, setData } = useDashboardStore();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    setData(initialData);

    fetch('/api/socket');
    socket.connect();

    socket.on('progress', (value: number) => setProgress(value));
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

}
