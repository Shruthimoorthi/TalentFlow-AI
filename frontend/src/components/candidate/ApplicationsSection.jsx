function ApplicationsSection({
  applications,
  jobs,
  getStatusStyles,
}) {
  return (
    <section
      id="applications"
      className="scroll-mt-24 pt-16"
    >
      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Your activity
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          My Applications
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Keep track of every opportunity you've applied to.
        </p>

      </div>

      <div className="mt-6">

        {applications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📋
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No applications yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Apply to a job above and your application will appear here.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {applications.map(
              (application, index) => {

                const job =
                  jobs.find(
                    (item) =>
                      item.id ===
                      application.jobId
                  )

                return (
                  <div
                    key={application.id}
                    className={`p-5 sm:p-6 ${
                      index !==
                      applications.length - 1
                        ? 'border-b border-slate-100'
                        : ''
                    }`}
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                          📋
                        </div>

                        <div>

                          <h3 className="font-bold text-slate-950">
                            {job?.title ||
                              'Job Application'}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Application ID:{' '}
                            {application.id}
                          </p>

                          {application.appliedAt && (
                            <p className="mt-1 text-xs text-slate-400">
                              Applied:{' '}
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </p>
                          )}

                        </div>

                      </div>

                      <span
                        className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>

                    </div>

                  </div>
                )
              }
            )}

          </div>
        )}

      </div>
    </section>
  )
}

export default ApplicationsSection