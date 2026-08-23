import { Link } from 'react-router-dom'
import Button from './Button'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            TF
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-950">
            TalentFlow
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            How it works
          </a>

          <a
            href="#ai"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            AI Tools
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          <Link to="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Get Started
            </Button>
          </Link>

        </div>

      </nav>
    </header>
  )
}

export default Navbar
