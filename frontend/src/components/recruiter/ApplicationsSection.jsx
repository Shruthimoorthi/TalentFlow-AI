import Button from '../Button'

function ApplicationsSection({
  applications,
  processingApplication,
  onStatusChange,
}) {
  return (
    <section
      id="applications"
      className="scroll-mt-24 pt-16"
    >

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Candidate Management
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Applications
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review candidates and update their application status.
        </p>

      </div>

      <div className="mt-6">

        {applications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
              📋
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No applications yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Applications from candidates will appear here.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {applications.map(
              (application, index) => {

                const isProcessing =
                  processingApplication ===
                  application.id

                const statusStyles =
                  application.status ===
                  'SHORTLISTED'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : application.status ===
                        'REJECTED'
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-blue-200 bg-blue-50 text-blue-700'

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

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                          👤
                        </div>

                        <div>

                          <h3 className="font-bold text-slate-950">
                            Candidate Application
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Candidate ID:{' '}
                            {application.candidateId}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Application ID:{' '}
                            {application.id}
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        <span
                          className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles}`}
                        >
                          {application.status}
                        </span>

                        <div className="flex gap-2">

                          <Button
                            onClick={() =>
                              onStatusChange(
                                application.id,
                                'SHORTLISTED'
                              )
                            }
                            disabled={
                              isProcessing
                            }
                          >
                            {isProcessing
                              ? 'Updating...'
                              : 'Shortlist'}
                          </Button>

                          <Button
                            variant="secondary"
                            onClick={() =>
                              onStatusChange(
                                application.id,
                                'REJECTED'
                              )
                            }
                            disabled={
                              isProcessing
                            }
                          >
                            Reject
                          </Button>

                        </div>

                      </div>

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