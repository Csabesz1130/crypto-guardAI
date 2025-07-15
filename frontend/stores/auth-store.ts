import { create } from 'zustand'

interface AuthState {
  token?: string
  loading: boolean
  error?: string
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  loading: false,
  error: undefined,
  login: async (username, password) => {
    set({ loading: true, error: undefined })
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Login failed')
      const data = await res.json()
      set({ token: data.access_token, loading: false })
      // Persist token in localStorage for now
      if (typeof window !== 'undefined') {
        localStorage.setItem('cg_token', data.access_token)
      }
    } catch (e: any) {
      set({ error: e.message ?? 'Login error', loading: false })
    }
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cg_token')
    }
    set({ token: undefined })
  }
}))