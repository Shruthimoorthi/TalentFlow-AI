import Button from '../Button'

function JobCreationSection({
  title,
  description,
  location,
  employmentType,
  creatingJob,
  onTitleChange,
  onDescriptionChange,
  onLocationChange,
  onEmploymentTypeChange,
  onSubmit,
}) {
  return (
    <section
      id="jobs"
      className="scroll-mt-24 pt-16"
    >

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Hiring
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Create a Job
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Publish a new opportunity for candidates.
        </p>

      </div>

      <form
        onSubmit={onSubmit}
        className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Job Title
            </label>

            <input
              placeholder="e.g. Java Backend Developer"
              value={title}
              onChange={(event) =>
                onTitleChange(
                  event.target.value
                )
              }
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>

            <input
              placeholder="e.g. Bangalore"
              value={location}
              onChange={(event) =>
                onLocationChange(
                  event.target.value
                )
              }
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

        </div>

        <div className="mt-5">

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Job Description
          </label>

          <textarea
            rows="6"
            placeholder="Describe the role, responsibilities, and requirements..."
            value={description}
            onChange={(event) =>
              onDescriptionChange(
                event.target.value
              )
            }
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

        </div>

        <div className="mt-5">

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Employment Type
          </label>

          <select
            value={employmentType}
            onChange={(event) =>
              onEmploymentTypeChange(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 md:w-64"
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

        </div>

        <div className="mt-6">

          <Button
            type="submit"
            disabled={creatingJob}
          >
            {creatingJob
              ? 'Creating...'
              : '+ Create Job'}
          </Button>

        </div>

      </form>

    </section>
  )
}

export default JobCreationSection