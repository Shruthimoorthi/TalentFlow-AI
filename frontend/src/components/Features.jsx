const features = [
  {
    number: '01',
    title: 'AI Resume Analysis',
    description:
      'Upload your resume and let TalentFlow analyze your skills, experience, projects, ATS readiness, missing keywords, strengths, and areas for improvement using AI.',
  },
  {
    number: '02',
    title: 'ATS Resume Scoring',
    description:
      'Get a meaningful ATS score based on skills, experience, projects, resume completeness, and ATS readiness so you can understand how strong your resume is.',
  },
  {
    number: '03',
    title: 'AI Job Matching',
    description:
      'Compare your resume with a specific job and receive an AI-powered compatibility score, matched skills, missing skills, gaps, and personalized recommendations.',
  },
  {
    number: '04',
    title: 'Resume Management',
    description:
      'Upload, update, view, and manage your resumes in one place while keeping your professional summary and skills organized.',
  },
  {
    number: '05',
    title: 'Application Tracking',
    description:
      'Apply to available opportunities and track your application status from a single candidate dashboard throughout the recruitment process.',
  },
  {
    number: '06',
    title: 'Interview Management',
    description:
      'Manage scheduled interviews with date, time, notes, and meeting links, while receiving an automatic email notification when an interview is scheduled.',
  },
]

function Features() {
  return (
    <section
      id="features"
      className="border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            What TalentFlow does
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            One platform for your entire recruitment journey
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From improving your resume to finding relevant jobs, tracking
            applications, and managing interviews, TalentFlow brings the
            candidate experience together in one intelligent platform.
          </p>

        </div>

        {/* ================= FEATURE GRID ================= */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (

            <article
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
            >

              <div className="flex items-center justify-between">

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                  {feature.number}
                </span>

                <span className="text-slate-300 transition group-hover:text-blue-300">
                  →
                </span>

              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>

            </article>

          ))}

        </div>

        {/* ================= BOTTOM CALLOUT ================= */}

        <div className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 p-6 sm:p-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-semibold text-blue-700">
                Built around intelligent decision-making
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Understand your resume. Understand your opportunities.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                TalentFlow connects resume intelligence, job compatibility,
                applications, interviews, and communication into one workflow.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Features
