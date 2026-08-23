import Button from '../Button'

function JobsManagementSection({
  jobs,
  editingJobId,
  editTitle,
  editDescription,
  editLocation,
  editEmploymentType,
  savingJob,
  onEditClick,
  onCancelEdit,
  onUpdateJob,
  onTitleChange,
  onDescriptionChange,
  onLocationChange,
  onEmploymentTypeChange,
  onCloseJob,
  onDeleteJob,
  onRefresh,
}) {
  return (
    <section
      id="job-management"
      className="scroll-mt-24 pt-12"
    >

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Job Management
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            My Jobs
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your current and previous job postings.
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

      <div className="mt-6 grid gap-5">

        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              💼
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No jobs created yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first job posting above.
            </p>

          </div>
        ) : (
          jobs.map((job) => {

            const isEditing =
              editingJobId === job.id

            return (
              <article
                key={job.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
              >

                {isEditing ? (
                  <form
                    onSubmit={onUpdateJob}
                  >

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                      Edit Job
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-950">
                      Update job posting
                    </h3>

                    <input
                      value={editTitle}
                      onChange={(event) =>
                        onTitleChange(
                          event.target.value
                        )
                      }
                      placeholder="Job title"
                      required
                      className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <input
                      value={editLocation}
                      onChange={(event) =>
                        onLocationChange(
                          event.target.value
                        )
                      }
                      placeholder="Location"
                      required
                      className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <textarea
                      value={editDescription}
                      onChange={(event) =>
                        onDescriptionChange(
                          event.target.value
                        )
                      }
                      placeholder="Job description"
                      required
                      rows="6"
                      className="mt-4 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <select
                      value={editEmploymentType}
                      onChange={(event) =>
                        onEmploymentTypeChange(
                          event.target.value
                        )
                      }
                      className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:w-64"
                    >
                      <option value="FULL_TIME">
                        Full Time
                      </option>

                      <option value="PART_TIME">
                        Part Time
                      </option>

                      <option value="INTERNSHIP">
                        Internship
                      </option>
                    </select>

                    <div className="mt-6 flex flex-wrap gap-3">

                      <Button
                        type="submit"
                        disabled={savingJob}
                      >
                        {savingJob
                          ? 'Saving...'
                          : 'Save Changes'}
                      </Button>

                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancelEdit}
                      >
                        Cancel
                      </Button>

                    </div>

                  </form>
                ) : (
                  <>
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex min-w-0 gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                          💼
                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold text-slate-950">
                              {job.title}
                            </h3>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                job.status ===
                                'OPEN'
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : 'border-slate-200 bg-slate-100 text-slate-500'
                              }`}
                            >
                              {job.status}
                            </span>

                          </div>

                          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                            {job.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">

                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                              📍 {job.location}
                            </span>

                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                              💼 {job.employmentType}
                            </span>

                          </div>

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        <Button
                          variant="secondary"
                          onClick={() =>
                            onEditClick(job)
                          }
                        >
                          Edit
                        </Button>

                        {job.status ===
                          'OPEN' && (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              onCloseJob(job)
                            }
                          >
                            Close
                          </Button>
                        )}

                        <Button
                          variant="secondary"
                          onClick={() =>
                            onDeleteJob(job)
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </div>
                  </>
                )}

              </article>
            )
          })
        )}

      </div>

    </section>
  )
}

export default JobsManagementSection