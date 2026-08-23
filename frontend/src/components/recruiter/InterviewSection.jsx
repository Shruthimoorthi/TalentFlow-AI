import Button from '../Button'

function InterviewSection({
  recruiterId,
  applications,
  interviews,
  selectedApplication,
  interviewDate,
  meetingLink,
  creatingInterview,
  processingInterview,
  editingInterviewId,
  editInterviewDate,
  editMeetingLink,
  editInterviewStatus,
  editInterviewNotes,
  savingInterview,
  onSelectApplication,
  onInterviewDateChange,
  onMeetingLinkChange,
  onCreateInterview,
  onEditInterview,
  onCancelInterviewEdit,
  onUpdateInterview,
  onEditInterviewDateChange,
  onEditMeetingLinkChange,
  onEditInterviewStatusChange,
  onEditInterviewNotesChange,
  onDeleteInterview,
  onRefresh,
}) {
  return (
    <>
      {/* ================= SCHEDULE ================= */}

      <section
        id="interviews"
        className="scroll-mt-24 pt-16"
      >

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Interview Management
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Schedule an Interview
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Schedule interviews with shortlisted candidates.
          </p>

        </div>

        <form
          onSubmit={onCreateInterview}
          className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Candidate Application
            </label>

            <select
              value={
                selectedApplication?.id || ''
              }
              onChange={(event) =>
                onSelectApplication(
                  event.target.value
                )
              }
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="">
                Select a candidate
              </option>

              {applications
                .filter(
                  (application) =>
                    application.status ===
                    'SHORTLISTED'
                )
                .map(
                  (application) => (
                    <option
                      key={
                        application.id
                      }
                      value={
                        application.id
                      }
                    >
                      Candidate:{' '}
                      {
                        application.candidateId
                      }
                    </option>
                  )
                )}

            </select>

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Interview Date & Time
            </label>

            <input
              type="datetime-local"
              value={interviewDate}
              onChange={(event) =>
                onInterviewDateChange(
                  event.target.value
                )
              }
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Meeting Link
            </label>

            <input
              type="url"
              placeholder="https://meet.google.com/..."
              value={meetingLink}
              onChange={(event) =>
                onMeetingLinkChange(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          <div className="mt-6">

            <Button
              type="submit"
              disabled={
                creatingInterview
              }
            >
              {creatingInterview
                ? 'Scheduling...'
                : '+ Schedule Interview'}
            </Button>

          </div>

        </form>

      </section>

      {/* ================= SCHEDULED ================= */}

      <section className="scroll-mt-24 pt-12">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Interview Management
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Scheduled Interviews
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              View and manage your upcoming candidate interviews.
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

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                📅
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-950">
                No interviews scheduled
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Scheduled interviews will appear here.
              </p>

            </div>
          ) : (
            <div className="grid gap-5">

              {interviews.map(
                (interview) => {

                  const isEditing =
                    editingInterviewId ===
                    interview.id

                  const isProcessing =
                    processingInterview ===
                    interview.id

                  return (
                    <article
                      key={interview.id}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                    >

                      {isEditing ? (
                        <form
                          onSubmit={
                            onUpdateInterview
                          }
                        >

                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Edit Interview
                          </p>

                          <h3 className="mt-2 text-xl font-bold text-slate-950">
                            Update interview details
                          </h3>

                          <div className="mt-6">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Interview Date & Time
                            </label>

                            <input
                              type="datetime-local"
                              value={
                                editInterviewDate
                              }
                              onChange={(
                                event
                              ) =>
                                onEditInterviewDateChange(
                                  event.target
                                    .value
                                )
                              }
                              required
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>

                          <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Meeting Link
                            </label>

                            <input
                              type="url"
                              value={
                                editMeetingLink
                              }
                              onChange={(
                                event
                              ) =>
                                onEditMeetingLinkChange(
                                  event.target
                                    .value
                                )
                              }
                              placeholder="https://meet.google.com/..."
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>

                          <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Status
                            </label>

                            <select
                              value={
                                editInterviewStatus
                              }
                              onChange={(
                                event
                              ) =>
                                onEditInterviewStatusChange(
                                  event.target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:w-64"
                            >
                              <option value="SCHEDULED">
                                Scheduled
                              </option>

                              <option value="COMPLETED">
                                Completed
                              </option>

                              <option value="CANCELLED">
                                Cancelled
                              </option>
                            </select>

                          </div>

                          <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                              Notes
                            </label>

                            <textarea
                              value={
                                editInterviewNotes
                              }
                              onChange={(
                                event
                              ) =>
                                onEditInterviewNotesChange(
                                  event.target
                                    .value
                                )
                              }
                              rows="4"
                              placeholder="Interview notes..."
                              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">

                            <Button
                              type="submit"
                              disabled={
                                savingInterview
                              }
                            >
                              {savingInterview
                                ? 'Saving...'
                                : 'Save Changes'}
                            </Button>

                            <Button
                              type="button"
                              variant="secondary"
                              onClick={
                                onCancelInterviewEdit
                              }
                            >
                              Cancel
                            </Button>

                          </div>

                        </form>
                      ) : (
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
                                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                    interview.status ===
                                    'SCHEDULED'
                                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                                      : interview.status ===
                                          'COMPLETED'
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                        : 'border-red-200 bg-red-50 text-red-600'
                                  }`}
                                >
                                  {interview.status}
                                </span>

                              </div>

                              <div className="mt-4 space-y-2 text-sm">

                                <p className="text-slate-700">
                                  <span className="font-semibold">
                                    Candidate ID:
                                  </span>{' '}
                                  <span className="text-slate-500">
                                    {interview.candidateId}
                                  </span>
                                </p>

                                <p className="text-slate-700">
                                  <span className="font-semibold">
                                    Application ID:
                                  </span>{' '}
                                  <span className="text-slate-500">
                                    {interview.applicationId}
                                  </span>
                                </p>

                                <p className="text-slate-700">
                                  <span className="font-semibold">
                                    Scheduled:
                                  </span>{' '}
                                  <span className="text-slate-500">
                                    {new Date(
                                      interview.scheduledAt
                                    ).toLocaleString()}
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
                                      Join Meeting →
                                    </a>
                                  </p>
                                )}

                                {interview.notes && (
                                  <p className="text-slate-700">
                                    <span className="font-semibold">
                                      Notes:
                                    </span>{' '}
                                    <span className="text-slate-500">
                                      {
                                        interview.notes
                                      }
                                    </span>
                                  </p>
                                )}

                              </div>

                            </div>

                          </div>

                          <div className="flex flex-wrap gap-2">

                            <Button
                              variant="secondary"
                              onClick={() =>
                                onEditInterview(
                                  interview
                                )
                              }
                              disabled={
                                isProcessing
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              variant="secondary"
                              onClick={() =>
                                onDeleteInterview(
                                  interview
                                )
                              }
                              disabled={
                                isProcessing
                              }
                            >
                              {isProcessing
                                ? 'Cancelling...'
                                : 'Cancel Interview'}
                            </Button>

                          </div>

                        </div>
                      )}

                    </article>
                  )
                }
              )}

            </div>
          )}

        </div>

      </section>
    </>
  )
}

export default InterviewSection