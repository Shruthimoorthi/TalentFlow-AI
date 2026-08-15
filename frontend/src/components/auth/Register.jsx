import { Link } from 'react-router-dom'
import Button from '../Button'

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault()

    // Backend registration will be connected here later.
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mt-2 text-slate-400">
            Join TalentFlow and simplify your hiring journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8"
        >
          <div>
            <label
              htmlFor="register-name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              required
              minLength={8}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Confirm Password
            </label>

            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              required
              minLength={8}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <fieldset className="mt-5">
            <legend className="mb-3 text-sm font-medium text-slate-300">
              I am a
            </legend>

            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer rounded-lg border border-slate-700 bg-slate-950 p-4 transition hover:border-blue-500">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  required
                  className="mr-2 accent-blue-600"
                />

                <span className="text-sm text-slate-300">
                  Candidate
                </span>
              </label>

              <label className="cursor-pointer rounded-lg border border-slate-700 bg-slate-950 p-4 transition hover:border-blue-500">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="mr-2 accent-blue-600"
                />

                <span className="text-sm text-slate-300">
                  Recruiter
                </span>
              </label>
            </div>
          </fieldset>

          <div className="mt-6">
            <Button type="submit">
              Create Account
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register