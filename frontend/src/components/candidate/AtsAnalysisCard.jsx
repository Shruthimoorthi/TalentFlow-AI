function AtsAnalysisCard({ result }) {
  if (!result) {
    return null
  }

  const scores = [
    ['Skills', result.skillsScore],
    ['Experience', result.experienceScore],
    ['Projects', result.projectsScore],
    ['Completeness', result.completenessScore],
    ['ATS Ready', result.atsReadinessScore],
  ]

  return (
    <div className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-violet-50 p-5 sm:p-6">

      {/* HEADER */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            AI Resume Analysis
          </p>

          <h4 className="mt-1 text-lg font-bold text-slate-950">
            ATS analysis complete
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            AI-powered evaluation of your resume.
          </p>

        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/20">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">

            <span className="text-xl font-bold text-slate-950">
              {Math.round(
                result.matchScore || 0
              )}%
            </span>

          </div>

        </div>

      </div>

      {/* SUMMARY */}

      {result.summary && (
        <div className="mt-5 rounded-2xl bg-white/80 p-4">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Summary
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {result.summary}
          </p>

        </div>
      )}

      {/* SKILLS */}

      {result.skills?.length > 0 && (
        <div className="mt-5">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Detected Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {result.skills.map(
              (skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>
      )}

      {/* SCORE BREAKDOWN */}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

        {scores.map(
          ([label, value]) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >

              <p className="text-xs text-slate-400">
                {label}
              </p>

              <p className="mt-2 text-xl font-bold text-slate-950">
                {value ?? '—'}
              </p>

              {typeof value === 'number' && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, value)
                      )}%`,
                    }}
                  />
                </div>
              )}

            </div>
          )
        )}

      </div>

      {/* STRENGTHS */}

      {result.strengths?.length > 0 && (
        <div className="mt-6">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
            Strengths
          </p>

          <div className="mt-3 grid gap-2">

            {result.strengths.map(
              (strength, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-4"
                >
                  <p className="text-sm leading-6 text-slate-600">
                    {strength}
                  </p>
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* WEAKNESSES */}

      {result.weaknesses?.length > 0 && (
        <div className="mt-6">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
            Weaknesses
          </p>

          <div className="mt-3 grid gap-2">

            {result.weaknesses.map(
              (weakness, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-red-50 p-4"
                >
                  <p className="text-sm leading-6 text-red-700">
                    {weakness}
                  </p>
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* MISSING KEYWORDS */}

      {result.missingKeywords?.length > 0 && (
        <div className="mt-6">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
            Missing Keywords
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {result.missingKeywords.map(
              (keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
                >
                  {keyword}
                </span>
              )
            )}

          </div>

        </div>
      )}

      {/* SUGGESTIONS */}

      {result.suggestions?.length > 0 && (
        <div className="mt-6">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Suggestions
          </p>

          <div className="mt-3 grid gap-2">

            {result.suggestions.map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-blue-100 bg-white p-4"
                >
                  <p className="text-sm leading-6 text-slate-600">
                    {suggestion}
                  </p>
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* RECOMMENDATION */}

      {result.recommendation && (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Recommendation
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {result.recommendation}
          </p>

        </div>
      )}

    </div>
  )
}

export default AtsAnalysisCard