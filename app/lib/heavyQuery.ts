export async function heavyQuery() {
  await new Promise(res => setTimeout(res, 5000)); // simula carga pesada

  return {
    users: Math.floor(Math.random() * 1000),
    sales: Math.floor(Math.random() * 5000),
    updatedAt: new Date().toISOString(),
  };
}
