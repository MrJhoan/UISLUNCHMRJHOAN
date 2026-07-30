const demoUsers = [
  {
    id: 1,
    name: 'Estudiante Demo',
    email: 'estudiante.demo@example.com',
    code: '2202045',
    phoneNumber: '3000000000',
    rol: 'Estudiante',
    password: 'demo1234'
  },
  {
    id: 2,
    name: 'Administrador Demo',
    email: 'admin.demo@example.com',
    code: 'admin',
    phoneNumber: '3000000001',
    rol: 'Admin',
    password: 'admin1234'
  }
];

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const { code, password } = request.body ?? {};
  const user = demoUsers.find(
    candidate => candidate.code === String(code ?? '').trim() && candidate.password === password
  );

  if (!user) {
    return response.status(401).json({ message: 'Invalid credentials' });
  }

  const { password: _password, ...safeUser } = user;
  return response.status(200).json(safeUser);
}
