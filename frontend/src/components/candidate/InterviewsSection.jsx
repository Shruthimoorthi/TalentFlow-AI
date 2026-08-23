function InterviewsSection({
  interviews,
  onRefresh,
}) {
  return (
    <section
      id="interviews"
      className="scroll-mt-24 pt-16"
    >

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Interview management
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            My Interviews
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            View scheduled interviews and meeting details.
          </p>

        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          ↻ Refresh
        </button>

      </div>

      <div className="mt-6">

        {interviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              📅
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No interviews scheduled
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your scheduled interviews will appear here.
            </p>

          </div>
        ) : (
          <div className="grid gap-5">

            {interviews.map(
              (interview) => {

                const statusStyles =
                  interview.status ===
                  'SCHEDULED'
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : interview.status ===
                        'COMPLETED'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-red-200 bg-red-50 text-red-600'

                return (
                  <article
                    key={interview.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                  >

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                          📅
                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold text-slate-950">
                              Interview
                            </h3>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles}`}
                            >
                              {interview.status}
                            </span>

                          </div>

                          <div className="mt-4 space-y-2 text-sm">

                            <p className="text-slate-700">
                              <span className="font-semibold">
                                Date & Time:
                              </span>{' '}

                              <span className="text-slate-500">
                                {new Date(
                                  interview.scheduledAt
                                ).toLocaleString()}
                              </span>
                            </p>

                            <p className="text-slate-700">
                              <span className="font-semibold">
                                Application:
                              </span>{' '}

                              <span className="text-slate-500">
                                {interview.applicationId}
                              </span>
                            </p>

                            {interview.meetingLink && (
                              <p className="pt-1">

                                <a
                                  href={
                                    interview.meetingLink
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                  Join Interview →
                                </a>

                              </p>
                            )}

                            {interview.notes && (
                              <p className="text-slate-700">

                                <span className="font-semibold">
                                  Notes:
                                </span>{' '}

                                <span className="text-slate-500">
                                  {interview.notes}
                                </span>

                              </p>
                            )}

                          </div>

                        </div>

                      </div>

                      {interview.status ===
                        'SCHEDULED' &&
                        interview.meetingLink && (
                          <a
                            href={
                              interview.meetingLink
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                          >
                            Join Meeting →
                          </a>
                        )}

                    </div>

                  </article>
                )
              }
            )}

          </div>
        )}

      </div>
    </section>
  )
}

export default InterviewsSection