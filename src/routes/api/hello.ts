import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.log('Received request for /hello:', request)
        return new Response(JSON.stringify({ message: 'Hello, World!' }), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    },
  },
})
