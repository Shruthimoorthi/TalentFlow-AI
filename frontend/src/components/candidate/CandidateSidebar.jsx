import { Link } from 'react-router-dom'
function CandidateSidebar({
  activeSection,
  setActiveSection,
  onLogout,
}) {
  const navigation = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '⌂',
    },
    {
      id: 'resume',
      label: 'My Resume',
      icon: '▣',
    },
    {
      id: 'jobs',
      label: 'Find Jobs',
      icon: '⌕',
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: '✓',
    },
    {
      id: 'interviews',
      label: 'Interviews',
      icon: '◷',
    },
    {
  id: 'settings',
  label: 'Settings',
  icon: '⚙',
},
  ]

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">

        <div className="border-b border-slate-100 px-6 py-5">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
              TF
            </span>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-950">
                TalentFlow
              </p>

              <p className="text-xs text-slate-400">
                Candidate Portal
              </p>
            </div>
          </Link>

        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">

          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          {navigation.map((item) => {

            const active =
              activeSection === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setActiveSection(item.id)
                }
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            )
          })}

        </nav>

        <div className="border-t border-slate-100 p-3">

          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              ↪
            </span>

            Logout
          </button>

        </div>

      </aside>

      {/* Mobile navigation */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">

        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
              TF
            </span>

            <span className="font-bold text-slate-950">
              TalentFlow
            </span>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Logout
          </button>

        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">

          {navigation.map((item) => (

            <button
              key={item.id}
              type="button"
              onClick={() => {
  setActiveSection(item.id)

  setTimeout(() => {
    const section = document.getElementById(item.id)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, 100)
}}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.label}
            </button>

          ))}

        </div>

      </div>
    </>
  )
}

export default CandidateSidebar