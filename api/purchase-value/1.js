const demoValues = {
  cantidadDiaria: 120,
  cantidadCena: 80,
  cantidadMensual: 40,
  valorDiario: 4500,
  valorCena: 4500,
  valorMensual: 90000
};

export default function handler(request, response) {
  if (request.method === 'GET') {
    return response.status(200).json(demoValues);
  }

  if (request.method === 'PUT') {
    return response.status(200).json({ ...demoValues, ...(request.body ?? {}) });
  }

  response.setHeader('Allow', 'GET, PUT');
  return response.status(405).json({ message: 'Method not allowed' });
}
