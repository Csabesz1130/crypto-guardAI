'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'

export default function LoginPage() {
  const router = useRouter()
  const { loading, error, login, token } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(username, password)
    if (token) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border rounded-xl p-6 bg-card shadow"
      >
        <h2 className="text-2xl font-bold text-center">Sign in to CryptoGuard</h2>
        {error && <ErrorMessage message={error} />}
        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:border-primary"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Login'}
        </button>
      </form>
    </div>
  )
}