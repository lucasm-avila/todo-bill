import { authRequestMiddleware } from '@/middleware/auth.middleware'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/check-auth')({
  server: {
    middleware: [authRequestMiddleware],
    handlers: {
      GET: async ({ context, params, pathname }) => {
        return new Response(
          JSON.stringify({
            authenticated: true,
            user: context.user.name,
            params,
            pathname,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      },
      POST: async ({ context, request }) => {
        const body = await request.json()
        return new Response(
          JSON.stringify({
            authenticated: true,
            session: context.session.userId,
            data: body,
          }),
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
