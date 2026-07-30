export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed' });
  }

  return response.status(201).json({
    id: `demo-${Date.now()}`,
    demo: true,
    ...request.body
  });
}
