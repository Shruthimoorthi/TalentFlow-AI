import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../Button'
import { registerUser } from '../../services/api'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('candidate')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await registerUser(
        name,
        email,
        password,
        role
      )

      navigate('/login')
    } catch (error) {
      setError(
        error.message ||
        'Unable to create account'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT PANEL ================= */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-950 via-blue-950 to-slate-950 lg:flex lg:order-2">

          <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

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

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                Get started
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                One account.
                <span className="block text-blue-300">
                  Smarter recruitment.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300">
                Whether you're looking for your next opportunity or
                building your hiring pipeline, TalentFlow brings the
                tools together in one place.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-bold text-white">
                    AI
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Resume analysis & matching
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-bold text-white">
                    ATS
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Smarter resume scoring
                  </p>
                </div>

              </div>

            </div>

            <p className="text-xs text-slate-500">
              © 2026 TalentFlow
            </p>

          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:order-1 lg:px-12">

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
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Join TalentFlow and start building a smarter recruitment journey.
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

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* EMAIL */}

              <div className="mt-5">

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

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* ROLE */}

              <fieldset className="mt-6">

                <legend className="mb-3 text-sm font-semibold text-slate-700">
                  I am joining as
                </legend>

                <div className="grid grid-cols-2 gap-3">

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      role === 'candidate'
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/10'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="candidate"
                      checked={role === 'candidate'}
                      onChange={(event) =>
                        setRole(event.target.value)
                      }
                      className="sr-only"
                    />

                    <div className="text-2xl">
                      👤
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      Candidate
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Find jobs and improve your resume.
                    </p>

                  </label>

                  <label
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      role === 'recruiter'
                        ? 'border-violet-500 bg-violet-50 ring-2 ring-violet-500/10'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={role === 'recruiter'}
                      onChange={(event) =>
                        setRole(event.target.value)
                      }
                      className="sr-only"
                    />

                    <div className="text-2xl">
                      💼
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      Recruiter
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Manage jobs and candidates.
                    </p>

                  </label>

                </div>

              </fieldset>

              {/* SUBMIT */}

              <div className="mt-7">

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading
                    ? 'Creating account...'
                    : 'Create account'}
                </Button>

              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}

                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition hover:text-violet-600"
                >
                  Sign in
                </Link>
              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register