import { Link } from 'react-router-dom'
import Button from './Button'

function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">

        <Link
          to="/"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          TalentFlow
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">

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