import { Link } from 'react-router-dom'
import Button from './Button'

function Hero() {
  return (
    <main className="overflow-hidden bg-white">

      <section className="relative">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              AI-powered career & recruitment platform
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Build a stronger resume.
              <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Find the right opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              TalentFlow combines AI resume analysis, ATS scoring, job matching,
              applications, interviews, and notifications in one intelligent
              recruitment platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link to="/register">
                <Button className="w-full sm:w-auto">
                  Analyze My Resume →
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Explore Jobs
                </Button>
              </Link>

            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

              <span className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                AI-powered ATS analysis
              </span>

              <span className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                Job compatibility scoring
              </span>

              <span className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                Interview management
              </span>

            </div>

          </div>

          {/* RIGHT — ATS CARD */}
          <div className="relative">

            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-100/70 via-white to-violet-100/70 blur-2xl" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-7">

              <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Resume Analysis
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Software Engineer Resume
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Completed
                </span>

              </div>

              <div className="flex items-center gap-5 py-7">

                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 p-1 shadow-lg shadow-blue-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-slate-950">
                        88%
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        ATS Score
                      </p>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">

                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Skills
                      </span>
                      <span className="font-semibold text-slate-800">
                        90
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[90%] rounded-full bg-blue-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Projects
                      </span>
                      <span className="font-semibold text-slate-800">
                        92
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[92%] rounded-full bg-violet-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-500">
                        ATS readiness
                      </span>
                      <span className="font-semibold text-slate-800">
                        88
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[88%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                </div>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Detected skills
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Java · Spring Boot · React
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Job match
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    84% compatibility
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Hero
