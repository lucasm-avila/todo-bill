import { prisma } from '@/lib/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
const baseURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
      phoneNumber: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [tanstackStartCookies()],
})
export type Auth = typeof auth
export type Session = typeof auth.$Infer.Session
