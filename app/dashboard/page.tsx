import { getDashboardData } from '../lib/getDashboardData';
import DashboardClient from '../dashboard/client/page';

export default async function DashboardPage() {
  const result = await getDashboardData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <DashboardClient
        initialData={result.data}
        fromCache={result.fromCache}
      />
    </div>
  );
}
