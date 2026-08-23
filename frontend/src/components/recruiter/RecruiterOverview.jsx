function RecruiterOverview({
  name,
  jobs,
  applications,
  interviews,
  openJobs,
  shortlistedApplications,
}) {
  const scheduledInterviews =
    interviews.filter(
      (interview) =>
        interview.status === 'SCHEDULED'
    ).length

  return (
    <section id="overview" className="space-y-6">

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-sm sm:p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Recruiter workspace
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {name} 👋
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Manage your job openings, review candidates,
              schedule interviews, and keep your hiring pipeline moving.
            </p>

          </div>

          <div className="hidden h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-xl shadow-blue-600/20 lg:flex">

            <div className="text-center text-white">

              <p className="text-3xl font-bold">
                {openJobs}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-blue-100">
                Open Jobs
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {[
          {
            label: 'Total Jobs',
            value: jobs.length,
            icon: '💼',
            bg: 'bg-blue-50',
          },
          {
            label: 'Open Jobs',
            value: openJobs,
            icon: '◉',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Applications',
            value: applications.length,
            icon: '📋',
            bg: 'bg-violet-50',
          },
          {
            label: 'Shortlisted',
            value: shortlistedApplications,
            icon: '✓',
            bg: 'bg-amber-50',
          },
          {
            label: 'Interviews',
            value: scheduledInterviews,
            icon: '◷',
            bg: 'bg-cyan-50',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
              >
                {stat.icon}
              </span>

            </div>

            <p className="mt-5 text-3xl font-bold text-slate-950">
              {stat.value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}

export default RecruiterOverview