function AiTools() {
  const tools = [
    {
      title: 'AI Resume Analysis',
      description:
        'Analyze your resume for skills, experience, projects, missing keywords, and ATS readiness.',
      icon: '✦',
    },
    {
      title: 'ATS Score',
      description:
        'Get a score based on your resume quality, completeness, relevance, and ATS-friendly structure.',
      icon: '◉',
    },
    {
      title: 'AI Job Matching',
      description:
        'Compare your resume with a specific job and discover matched skills, missing skills, and gaps.',
      icon: '↗',
    },
  ]

  return (
    <section
      id="ai"
      className="border-t border-slate-200 bg-white px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            AI Tools
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            AI that helps you understand your career profile
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            TalentFlow uses AI to turn your resume and job descriptions into
            actionable insights.
          </p>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {tools.map((tool) => (
            <article
              key={tool.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white">
                {tool.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-950">
                {tool.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {tool.description}
              </p>

            </article>
          ))}

        </div>

      </div>
    </section>
  )
}

export default AiTools