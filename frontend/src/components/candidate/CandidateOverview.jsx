function CandidateOverview({
  name,
  jobs,
  applications,
  resumes,
  interviews,
  analysisResults,
}) {
  const analyzedResume =
    resumes.find(
      (resume) =>
        analysisResults?.[resume.id]
    )

  const atsScore = analyzedResume
    ? Math.round(
        analysisResults[
          analyzedResume.id
        ]?.matchScore || 0
      )
    : null

  const scheduledInterviews =
    interviews.filter(
      (interview) =>
        interview.status === 'SCHEDULED'
    ).length

  return (
    <section
      id="overview"
      className="space-y-6"
    >

      {/* Welcome */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-sm sm:p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Candidate workspace
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Welcome back, {name} 👋
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Manage your resume, discover relevant opportunities,
              track applications, and stay on top of your interviews.
            </p>

          </div>

          <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-xl shadow-blue-600/20 lg:flex">

            <div className="text-center text-white">

              <p className="text-3xl font-bold">
                {resumes.length}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-blue-100">
                Resumes
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              ◉
            </span>

            <span className="text-xs font-medium text-slate-400">
              Resume
            </span>

          </div>

          <p className="mt-5 text-3xl font-bold text-slate-950">
            {atsScore !== null
              ? `${atsScore}%`
              : '—'}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Latest ATS score
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              💼
            </span>

            <span className="text-xs font-medium text-slate-400">
              Opportunities
            </span>

          </div>

          <p className="mt-5 text-3xl font-bold text-slate-950">
            {jobs.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Available jobs
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              ✓
            </span>

            <span className="text-xs font-medium text-slate-400">
              Activity
            </span>

          </div>

          <p className="mt-5 text-3xl font-bold text-slate-950">
            {applications.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Applications
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              ◷
            </span>

            <span className="text-xs font-medium text-slate-400">
              Interviews
            </span>

          </div>

          <p className="mt-5 text-3xl font-bold text-slate-950">
            {scheduledInterviews}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Upcoming
          </p>

        </div>

      </div>

    </section>
  )
}

export default CandidateOverview