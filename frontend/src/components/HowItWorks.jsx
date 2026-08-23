const steps = [
  {
    number: '01',
    title: 'Upload your resume',
    description:
      'Add your PDF resume and let TalentFlow extract the information needed for intelligent analysis.',
  },
  {
    number: '02',
    title: 'Get your ATS score',
    description:
      'AI evaluates your skills, experience, projects, completeness, and ATS readiness to generate a meaningful score.',
  },
  {
    number: '03',
    title: 'Match with jobs',
    description:
      'Compare your resume with available jobs and discover your compatibility, matched skills, missing skills, and gaps.',
  },
  {
    number: '04',
    title: 'Apply & manage interviews',
    description:
      'Apply to relevant opportunities, track applications, manage interviews, and receive interview notifications.',
  },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            From resume to opportunity in four simple steps
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            TalentFlow brings the complete candidate journey together,
            from improving your resume to managing your recruitment process.
          </p>

        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-slate-200 lg:block" />

          {steps.map((step) => (

            <article
              key={step.number}
              className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
            >

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-950">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>

            </article>

          ))}

        </div>

      </div>
    </section>
  )
}

export default HowItWorks