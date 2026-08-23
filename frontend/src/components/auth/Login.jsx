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
      setError(error.message || 'Unable to log in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT PANEL ================= */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 lg:flex">

          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">

            <Link
              to="/"
              className="flex w-fit items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
                TF
              </span>

              <span className="text-xl font-bold text-white">
                TalentFlow
              </span>
            </Link>

            <div className="max-w-lg">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Welcome back
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Your next opportunity starts here.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300">
                Analyze your resume, discover better job matches, track
                applications, and manage your recruitment journey with
                TalentFlow.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                    ✓
                  </span>
                  AI-powered ATS resume analysis
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                    ✓
                  </span>
                  Intelligent job matching
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                    ✓
                  </span>
                  Applications and interview management
                </div>

              </div>

            </div>

            <p className="text-xs text-slate-500">
              © 2026 TalentFlow
            </p>

          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">

          <div className="w-full max-w-md">

            <div className="mb-8 text-center lg:text-left">

              <Link
                to="/"
                className="inline-flex items-center gap-2 lg:hidden"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
                  TF
                </span>

                <span className="text-lg font-bold text-slate-950">
                  TalentFlow
                </span>
              </Link>

              <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your TalentFlow workspace.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
            >

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* PASSWORD */}

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* SUBMIT */}

              <div className="mt-7">

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading
                    ? 'Signing in...'
                    : 'Sign in'}
                </Button>

              </div>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{' '}

                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-violet-600"
                >
                  Create account
                </Link>
              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login