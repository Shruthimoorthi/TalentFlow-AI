function RecruiterSettings({
  name,
  email,
  role,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
        Account
      </p>

      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Profile & Settings
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs text-slate-400">
            Name
          </p>

          <p className="mt-2 font-semibold text-slate-950">
            {name}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs text-slate-400">
            Email
          </p>

          <p className="mt-2 font-semibold text-slate-950">
            {email || '—'}
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs text-slate-400">
            Role
          </p>

          <p className="mt-2 font-semibold text-slate-950">
            {role || 'RECRUITER'}
          </p>

        </div>

      </div>

    </section>
  )
}

export default RecruiterSettings