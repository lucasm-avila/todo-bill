import { getSession } from '@/server/auth.functions'
import { createMiddleware } from '@tanstack/react-start'

export const authFnMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  const sessionData = await getSession()

  if (!sessionData) {
    // Throwing an error or standard response instantly halts execution
    throw new Error('Unauthorized')
  }

  // Passes down the strongly-typed user session into downstream functions
  return next({
    context: {
      user: sessionData.user,
      session: sessionData.session,
    },
  })
})

export const authRequestMiddleware = createMiddleware({
  type: 'request',
}).server(async ({ next }) => {
  const sessionData = await getSession()

  if (!sessionData) {
    // Throwing an error or standard response instantly halts execution
    throw new Error('Unauthorized')
  }

  // Passes down the strongly-typed user session into downstream functions
  return next({
    context: {
      user: sessionData.user,
      session: sessionData.session,
    },
  })
})
