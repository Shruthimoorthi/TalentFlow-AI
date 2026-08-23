function CandidateSettings({
  name,
  email,
  role,
}) {
  return (
    <section
      id="settings"
      className="scroll-mt-24 pt-16"
    >

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Account
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Profile & Settings
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View your TalentFlow account information.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Name
            </p>

            <p className="mt-2 font-semibold text-slate-950">
              {name}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Email
            </p>

            <p className="mt-2 break-all font-semibold text-slate-950">
              {email || '—'}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Role
            </p>

            <p className="mt-2 font-semibold text-slate-950">
              {role || 'CANDIDATE'}
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CandidateSettings