function RecruiterHeader({
  name,
  activeSection,
}) {
  const titles = {
    overview: {
      title: 'Overview',
      subtitle:
        'Your recruitment activity at a glance.',
    },
    jobs: {
      title: 'Jobs',
      subtitle:
        'Create and manage your job openings.',
    },
    applications: {
      title: 'Applications',
      subtitle:
        'Review candidates and manage application status.',
    },
    interviews: {
      title: 'Interviews',
      subtitle:
        'Schedule and manage candidate interviews.',
    },
  }

  const current =
    titles[activeSection] ||
    titles.overview

  return (
    <header className="hidden border-b border-slate-200 bg-white lg:block">

      <div className="flex items-center justify-between px-8 py-5">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Recruiter Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            {current.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {current.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden text-right xl:block">

            <p className="text-sm font-semibold text-slate-900">
              {name}
            </p>

            <p className="text-xs text-slate-400">
              Recruiter
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
            {name
              ?.charAt(0)
              ?.toUpperCase() || 'R'}
          </div>

        </div>

      </div>
    </header>
  )
}

export default RecruiterHeader