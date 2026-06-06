import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/api/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response(
          JSON.stringify({ message: 'TODO-BILL API is working!' }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      },
    },
  },
})
