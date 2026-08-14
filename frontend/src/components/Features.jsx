const features = [
  {
    title: 'AI Resume Screening',
    description:
      'Automatically analyze resumes and identify candidates who best match your job requirements.',
  },
  {
    title: 'Candidate Management',
    description:
      'Track candidates throughout the hiring process with a centralized recruitment workspace.',
  },
  {
    title: 'Hiring Analytics',
    description:
      'Understand your recruitment pipeline with insights that help you make better hiring decisions.',
  },
]

function Features() {
  return (
    <section className="border-t border-slate-800 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Platform
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to hire better
          </h2>

          <p className="mt-4 text-slate-400">
            TalentFlow brings the essential parts of modern recruitment into
            one intelligent platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features