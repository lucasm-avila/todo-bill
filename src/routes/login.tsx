import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { authClient } from '../lib/auth-client'
const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/login')({
  validateSearch: searchSchema,
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await authClient.signIn.email({
      email,
      password,
    })
    if (error) {
      setError(error.message || 'Invalid credentials')
      setLoading(false)
    } else {
      // Redirect handled by auth state change
      window.location.href = '/dashboard'
    }
  }

  const handleGitHubSignIn = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
    })
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8">
        <h1 className="mb-6 text-2xl font-bold">Sign In</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full rounded-md border px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full rounded-md border px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-gray-900 px-4 py-3 text-white"
          onClick={handleSignIn}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Email'}
        </button>
        {errorMessage && (
          <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}
