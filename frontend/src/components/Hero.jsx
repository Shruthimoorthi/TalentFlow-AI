import Button from './Button'

function Hero() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-77px)] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20">
      <section className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 sm:text-sm">
          AI-Powered Recruitment
        </p>

        <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Hire smarter.
          <br />
          Build better teams.
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          TalentFlow helps recruiters manage candidates, automate recruitment
          workflows, and make better hiring decisions with AI.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button>
            Get Started
          </Button>

          <Button variant="secondary">
            Explore Platform
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Hero