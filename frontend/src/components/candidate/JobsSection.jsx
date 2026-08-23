import Button from '../Button'

function JobsSection({
  jobs,
  search,
  onSearchChange,
  getApplicationForJob,
  applyingJobId,
  onApply,
  getStatusStyles,
}) {
  return (
    <section
      id="jobs"
      className="scroll-mt-24 pt-16"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Opportunities
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Find your next opportunity
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Search available jobs and apply with your profile.
          </p>

        </div>

        <div className="w-full lg:max-w-md">

          <input
            type="text"
            placeholder="Search by title, location, or type..."
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

        </div>

      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center lg:col-span-2">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              🔍
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or check back later.
            </p>

          </div>
        ) : (
          jobs.map((job) => {

            const application =
              getApplicationForJob(job.id)

            const applied =
              Boolean(application)

            const isApplying =
              applyingJobId === job.id

            return (
              <article
                key={job.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                    💼
                  </div>

                  {job.status && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {job.status}
                    </span>
                  )}

                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {job.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                  {job.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {job.location && (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      📍 {job.location}
                    </span>
                  )}

                  {job.employmentType && (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      💼 {job.employmentType}
                    </span>
                  )}

                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">

                  {applied ? (
                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        Application status
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                    </div>
                  ) : (
                    <Button
                      onClick={() =>
                        onApply(job.id)
                      }
                      disabled={isApplying}
                      className="w-full"
                    >
                      {isApplying
                        ? 'Applying...'
                        : 'Apply Now'}
                    </Button>
                  )}

                </div>

              </article>
            )
          })
        )}

      </div>
    </section>
  )
}

export default JobsSection