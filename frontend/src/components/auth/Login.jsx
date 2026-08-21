import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import { loginUser } from '../../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password)

      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('name', data.name)
      localStorage.setItem('email', data.email)
      localStorage.setItem('role', data.role)

      if (data.role === 'CANDIDATE') {
        navigate('/candidate')
      } else if (data.role === 'RECRUITER') {
        navigate('/recruiter')
      } else {
        navigate('/')
      }

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to continue to TalentFlow
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8"
        >

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            <Button type="submit">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{' '}

            <Link
              to="/register"
              className="font-medium text-blue-400"
            >
              Create account
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login