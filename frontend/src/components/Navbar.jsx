import Button from './Button'

function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          TalentFlow
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar