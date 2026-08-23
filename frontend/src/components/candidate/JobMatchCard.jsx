function JobMatchCard({
  resume,
  jobs,
  selectedJobForMatch,
  onSelectJob,
  onMatch,
  isMatching,
  results,
}) {
  return (
    <>
      {/* ================= MATCH CONTROLS ================= */}

      <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            AI Job Matching
          </p>

          <h4 className="mt-1 text-lg font-bold text-slate-950">
            See how well your resume matches a job
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Compare your skills and experience against a specific opportunity.
          </p>

        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">

          <select
            value={selectedJobForMatch}
            onChange={(event) =>
              onSelectJob(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          >
            <option value="">
              Select a job to match
            </option>

            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
              >
                {job.title}
              </option>
            ))}

          </select>

          <button
            type="button"
            onClick={onMatch}
            disabled={
              isMatching ||
              !selectedJobForMatch
            }
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMatching
              ? 'Matching...'
              : 'Match with Job'}
          </button>

        </div>

      </div>

      {/* ================= MATCH RESULTS ================= */}

      {Object.entries(results || {}).map(
        ([jobId, result]) => (
          <div
            key={jobId}
            className="mt-5 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                  AI Job Match
                </p>

                <h4 className="mt-1 text-lg font-bold text-slate-950">
                  {result.jobTitle ||
                    'Resume vs Job'}
                </h4>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">

                <span className="text-xl font-bold text-emerald-700">
                  {Math.round(
                    result.matchScore || 0
                  )}%
                </span>

              </div>

            </div>

            {/* MATCHED SKILLS */}

            {result.matchedSkills?.length > 0 && (
              <div className="mt-6">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Matched Skills
                </p>

                <div className="flex flex-wrap gap-2">

                  {result.matchedSkills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

            {/* MISSING SKILLS */}

            {result.missingSkills?.length > 0 && (
              <div className="mt-6">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Missing Skills
                </p>

                <div className="flex flex-wrap gap-2">

                  {result.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

            {/* STRENGTHS */}

            {result.matchingStrengths?.length > 0 && (
              <div className="mt-6">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Matching Strengths
                </p>

                <div className="mt-3 space-y-2">

                  {result.matchingStrengths.map(
                    (strength, index) => (
                      <div
                        key={index}
                        className="rounded-2xl bg-slate-50 p-4"
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

            {/* GAPS */}

            {result.gaps?.length > 0 && (
              <div className="mt-6">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Skill & Experience Gaps
                </p>

                <div className="mt-3 space-y-2">

                  {result.gaps.map(
                    (gap, index) => (
                      <div
                        key={index}
                        className="rounded-2xl bg-red-50 p-4"
                      >
                        <p className="text-sm leading-6 text-red-700">
                          {gap}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

            {/* EXPLANATION */}

            {result.explanation && (
              <div className="mt-6">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  AI Analysis
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {result.explanation}
                </p>

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
      )}
    </>
  )
}

export default JobMatchCard