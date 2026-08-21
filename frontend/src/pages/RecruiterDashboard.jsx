
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import InterviewManagement from '../components/interviews/InterviewManagement'
import {
  getJobs,
  getJobApplications,
  createJob,
  updateJob,
  deleteJob,
  updateApplicationStatus,

  createInterview,
  getInterviewsByRecruiter,
  updateInterview,
  deleteInterview,

  logout,
} from '../services/api'

function RecruiterDashboard() {
  const navigate = useNavigate()

  const recruiterId = localStorage.getItem('userId')
  const name = localStorage.getItem('name') || 'Recruiter'

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [employmentType, setEmploymentType] =
    useState('FULL_TIME')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Editing state
  const [editingJobId, setEditingJobId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editEmploymentType, setEditEmploymentType] =
    useState('FULL_TIME')

  const [savingJob, setSavingJob] = useState(false)
  const [creatingJob, setCreatingJob] = useState(false)
  const [processingApplication, setProcessingApplication] =
    useState(null)
  // ==================== INTERVIEW STATE ====================

const [interviews, setInterviews] = useState([])

const [selectedApplication, setSelectedApplication] = useState(null)

const [interviewDate, setInterviewDate] = useState('')
const [meetingLink, setMeetingLink] = useState('')

const [creatingInterview, setCreatingInterview] = useState(false)
const [processingInterview, setProcessingInterview] = useState(null)

const [editingInterviewId, setEditingInterviewId] = useState(null)
const [editInterviewDate, setEditInterviewDate] = useState('')
const [editMeetingLink, setEditMeetingLink] = useState('')
const [editInterviewStatus, setEditInterviewStatus] = useState('SCHEDULED')
const [editInterviewNotes, setEditInterviewNotes] = useState('')
const [savingInterview, setSavingInterview] = useState(false)

  // ==================== LOAD DASHBOARD ====================

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const jobsData = await getJobs()

      const ownJobs = jobsData.filter(
        (job) => job.recruiterId === recruiterId
      )

      setJobs(ownJobs)

      const allApplications = []

for (const job of ownJobs) {
  const jobApplications =
    await getJobApplications(job.id)

  allApplications.push(...jobApplications)
}

setApplications(allApplications)

// ==================== LOAD INTERVIEWS ====================

const interviewData =
  await getInterviewsByRecruiter(recruiterId)

setInterviews(interviewData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!recruiterId) {
      navigate('/login')
      return
    }

    loadDashboard()
  }, [])

  // ==================== CREATE JOB ====================

  const handleCreateJob = async (event) => {
    event.preventDefault()

    try {
      setCreatingJob(true)
      setError('')

      await createJob({
        title,
        description,
        location,
        employmentType,
        recruiterId,
      })

      setTitle('')
      setDescription('')
      setLocation('')
      setEmploymentType('FULL_TIME')

      await loadDashboard()
    } catch (error) {
      setError(error.message)
    } finally {
      setCreatingJob(false)
    }
  }
 // ==================== CREATE INTERVIEW ====================

const handleCreateInterview = async (event) => {
  event.preventDefault()

  if (!selectedApplication) {
    setError('Please select a candidate application.')
    return
  }

  try {
    setCreatingInterview(true)
    setError('')

    await createInterview({
      applicationId: selectedApplication.id,
      recruiterId,
      candidateId: selectedApplication.candidateId,
      scheduledAt: interviewDate,
      meetingLink,
    })

    setSelectedApplication(null)
    setInterviewDate('')
    setMeetingLink('')

    await loadDashboard()
  } catch (error) {
    setError(error.message)
  } finally {
    setCreatingInterview(false)
  }
}
// ==================== EDIT INTERVIEW ====================

const handleEditInterview = (interview) => {
  setEditingInterviewId(interview.id)

  setEditInterviewDate(interview.scheduledAt || '')
  setEditMeetingLink(interview.meetingLink || '')
  setEditInterviewStatus(interview.status || 'SCHEDULED')
  setEditInterviewNotes(interview.notes || '')
}

const handleCancelInterviewEdit = () => {
  setEditingInterviewId(null)

  setEditInterviewDate('')
  setEditMeetingLink('')
  setEditInterviewStatus('SCHEDULED')
  setEditInterviewNotes('')
}

const handleUpdateInterview = async (event) => {
  event.preventDefault()

  try {
    setSavingInterview(true)
    setError('')

    const currentInterview = interviews.find(
      (interview) => interview.id === editingInterviewId
    )

    await updateInterview(editingInterviewId, {
      applicationId: currentInterview.applicationId,
      recruiterId: currentInterview.recruiterId,
      candidateId: currentInterview.candidateId,
      scheduledAt: editInterviewDate,
      meetingLink: editMeetingLink,
      status: editInterviewStatus,
      notes: editInterviewNotes,
    })

    handleCancelInterviewEdit()

    await loadDashboard()
  } catch (error) {
    setError(error.message)
  } finally {
    setSavingInterview(false)
  }
}

// ==================== DELETE INTERVIEW ====================

const handleDeleteInterview = async (interview) => {
  if (
    !window.confirm(
      'Are you sure you want to cancel this interview?'
    )
  ) {
    return
  }

  try {
    setProcessingInterview(interview.id)
    setError('')

    await deleteInterview(interview.id)

    await loadDashboard()
  } catch (error) {
    setError(error.message)
  } finally {
    setProcessingInterview(null)
  }
}
  // ==================== START EDIT ====================

  const handleEditClick = (job) => {
    setEditingJobId(job.id)

    setEditTitle(job.title)
    setEditDescription(job.description)
    setEditLocation(job.location)
    setEditEmploymentType(job.employmentType)
  }

  // ==================== CANCEL EDIT ====================

  const handleCancelEdit = () => {
    setEditingJobId(null)

    setEditTitle('')
    setEditDescription('')
    setEditLocation('')
    setEditEmploymentType('FULL_TIME')
  }

  // ==================== SAVE EDIT ====================

  const handleUpdateJob = async (event) => {
    event.preventDefault()

    try {
      setSavingJob(true)
      setError('')

      const currentJob = jobs.find(
        (job) => job.id === editingJobId
      )

      await updateJob(editingJobId, {
        title: editTitle,
        description: editDescription,
        location: editLocation,
        employmentType: editEmploymentType,
        status: currentJob?.status || 'OPEN',
      })

      handleCancelEdit()

      await loadDashboard()
    } catch (error) {
      setError(error.message)
    } finally {
      setSavingJob(false)
    }
  }

  // ==================== CLOSE JOB ====================

  const handleCloseJob = async (job) => {
    if (
      !window.confirm(
        `Are you sure you want to close "${job.title}"?`
      )
    ) {
      return
    }

    try {
      setError('')

      await updateJob(job.id, {
        title: job.title,
        description: job.description,
        location: job.location,
        employmentType: job.employmentType,
        status: 'CLOSED',
      })

      await loadDashboard()
    } catch (error) {
      setError(error.message)
    }
  }

  // ==================== DELETE JOB ====================

  const handleDeleteJob = async (job) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${job.title}"?`
      )
    ) {
      return
    }

    try {
      setError('')

      await deleteJob(job.id)

      await loadDashboard()
    } catch (error) {
      setError(error.message)
    }
  }

  // ==================== APPLICATION STATUS ====================

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setProcessingApplication(applicationId)
      setError('')

      await updateApplicationStatus(
        applicationId,
        status
      )

      await loadDashboard()
    } catch (error) {
      setError(error.message)
    } finally {
      setProcessingApplication(null)
    }
  }

  // ==================== LOGOUT ====================

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // ==================== STATS ====================

  const openJobs = jobs.filter(
    (job) => job.status === 'OPEN'
  ).length

  const closedJobs = jobs.filter(
    (job) => job.status === 'CLOSED'
  ).length

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status === 'SHORTLISTED'
    ).length

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status === 'REJECTED'
    ).length

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-slate-400">
            Loading recruiter dashboard...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              TalentFlow
            </h1>

            <p className="text-sm text-slate-400">
              Recruiter Portal
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {/* ================= WELCOME ================= */}

        <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm font-medium text-blue-400">
                Recruiter Dashboard
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome, {name} 👋
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Manage your job openings, review candidates,
                and build your next great team.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center">
                <p className="text-2xl font-bold">
                  {jobs.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Total Jobs
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center">
                <p className="text-2xl font-bold text-green-400">
                  {openJobs}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Open
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center">
                <p className="text-2xl font-bold">
                  {applications.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Applications
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {shortlistedApplications}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Shortlisted
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">

            <span>{error}</span>

            <button
              onClick={loadDashboard}
              className="font-medium text-red-300 hover:text-white"
            >
              Retry
            </button>

          </div>
        )}

        {/* ================= CREATE JOB ================= */}

        <section className="mt-10">

          <div>
            <p className="text-sm font-medium text-blue-400">
              Hiring
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Create a Job
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Publish a new opportunity for candidates.
            </p>
          </div>

          <form
            onSubmit={handleCreateJob}
            className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Job Title
                </label>

                <input
                  placeholder="e.g. Java Backend Developer"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Location
                </label>

                <input
                  placeholder="e.g. Bangalore"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Job Description
              </label>

              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
                rows="5"
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>

            <div className="mt-5">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Employment Type
              </label>

              <select
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 md:w-64"
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

        {/* ================= MY JOBS ================= */}

        <section className="mt-12">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium text-blue-400">
                Job Management
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                My Jobs
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage your current and previous job postings.
              </p>

            </div>

            <button
              onClick={loadDashboard}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              ↻ Refresh
            </button>

          </div>

          <div className="mt-6 grid gap-5">

            {jobs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">

                <div className="text-4xl">
                  💼
                </div>

                <h3 className="mt-4 font-semibold">
                  No jobs created yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Create your first job posting above.
                </p>

              </div>
            ) : (
              jobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-slate-700"
                >

                  {/* EDIT MODE */}

                  {editingJobId === job.id ? (

                    <form onSubmit={handleUpdateJob}>

                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-sm font-medium text-blue-400">
                            Job Management
                          </p>

                          <h3 className="mt-1 text-xl font-semibold">
                            Edit Job
                          </h3>
                        </div>

                      </div>

                      <input
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        placeholder="Job title"
                        required
                        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                      <input
                        value={editLocation}
                        onChange={(e) =>
                          setEditLocation(e.target.value)
                        }
                        placeholder="Location"
                        required
                        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(
                            e.target.value
                          )
                        }
                        placeholder="Job description"
                        required
                        rows="5"
                        className="mt-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                      <select
                        value={editEmploymentType}
                        onChange={(e) =>
                          setEditEmploymentType(
                            e.target.value
                          )
                        }
                        className="mt-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>

                      </div>

                    </form>

                  ) : (

                    /* NORMAL JOB VIEW */

                    <>

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        <div className="flex gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                            💼
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-3">

                              <h3 className="text-xl font-semibold">
                                {job.title}
                              </h3>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                                  job.status === 'OPEN'
                                    ? 'border-green-500/20 bg-green-500/10 text-green-400'
                                    : 'border-slate-700 bg-slate-800 text-slate-400'
                                }`}
                              >
                                {job.status}
                              </span>

                            </div>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                              {job.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">

                              <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                                📍 {job.location}
                              </span>

                              <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                                💼 {job.employmentType}
                              </span>

                            </div>

                          </div>

                        </div>

                        <div className="flex flex-wrap gap-2 lg:justify-end">

                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleEditClick(job)
                            }
                          >
                            Edit
                          </Button>

                          {job.status === 'OPEN' && (
                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleCloseJob(job)
                              }
                            >
                              Close
                            </Button>
                          )}

                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleDeleteJob(job)
                            }
                          >
                            Delete
                          </Button>

                        </div>

                      </div>

                    </>

                  )}

                </div>

              ))
            )}

          </div>

        </section>
{/* ==================== SCHEDULE INTERVIEW ==================== */}

<section className="mt-12">

  <div>
    <p className="text-sm font-medium text-blue-400">
      Interview Management
    </p>

    <h2 className="mt-1 text-2xl font-bold">
      Schedule an Interview
    </h2>

    <p className="mt-1 text-sm text-slate-400">
      Schedule interviews with shortlisted candidates.
    </p>
  </div>

  <form
    onSubmit={handleCreateInterview}
    className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
  >

    {/* Candidate/Application */}

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Candidate Application
      </label>

      <select
        value={selectedApplication?.id || ''}
        onChange={(e) => {
          const application = applications.find(
            (item) => item.id === e.target.value
          )

          setSelectedApplication(application || null)
        }}
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >

        <option value="">
          Select a candidate
        </option>

        {applications
          .filter(
            (application) =>
              application.status === 'SHORTLISTED'
          )
          .map((application) => (
            <option
              key={application.id}
              value={application.id}
            >
              Candidate: {application.candidateId}
            </option>
          ))}

      </select>
    </div>

    {/* Date & Time */}

    <div className="mt-5">

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Interview Date & Time
      </label>

      <input
        type="datetime-local"
        value={interviewDate}
        onChange={(e) =>
          setInterviewDate(e.target.value)
        }
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

    </div>

    {/* Meeting Link */}

    <div className="mt-5">

      <label className="mb-2 block text-sm font-medium text-slate-300">
        Meeting Link
      </label>

      <input
        type="url"
        placeholder="https://meet.google.com/..."
        value={meetingLink}
        onChange={(e) =>
          setMeetingLink(e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

    </div>

    {/* Submit */}

    <div className="mt-6">

      <Button
        type="submit"
        disabled={creatingInterview}
      >
        {creatingInterview
          ? 'Scheduling...'
          : '+ Schedule Interview'}
      </Button>

    </div>

  </form>

</section>
{/* ==================== SCHEDULED INTERVIEWS ==================== */}

<section className="mt-12">

  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

    <div>
      <p className="text-sm font-medium text-blue-400">
        Interview Management
      </p>

      <h2 className="mt-1 text-2xl font-bold">
        Scheduled Interviews
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        View and manage your upcoming candidate interviews.
      </p>
    </div>

    <button
      onClick={loadDashboard}
      className="text-sm font-medium text-slate-400 transition hover:text-white"
    >
      ↻ Refresh
    </button>

  </div>

  <div className="mt-6">

    {interviews.length === 0 ? (

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">

        <div className="text-4xl">
          📅
        </div>

        <h3 className="mt-4 font-semibold">
          No interviews scheduled
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Scheduled interviews will appear here.
        </p>

      </div>

    ) : (

      <div className="grid gap-5">

        {interviews.map((interview) => {

          const isEditing =
            editingInterviewId === interview.id

          const isProcessing =
            processingInterview === interview.id

          return (

            <div
              key={interview.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >

              {isEditing ? (

                /* ==================== EDIT INTERVIEW ==================== */

                <form onSubmit={handleUpdateInterview}>

                  <div>

                    <p className="text-sm font-medium text-blue-400">
                      Interview Management
                    </p>

                    <h3 className="mt-1 text-xl font-semibold">
                      Edit Interview
                    </h3>

                  </div>

                  <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Interview Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      value={editInterviewDate}
                      onChange={(e) =>
                        setEditInterviewDate(
                          e.target.value
                        )
                      }
                      required
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Meeting Link
                    </label>

                    <input
                      type="url"
                      value={editMeetingLink}
                      onChange={(e) =>
                        setEditMeetingLink(
                          e.target.value
                        )
                      }
                      placeholder="https://meet.google.com/..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>

                  <div className="mt-5">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Status
                    </label>

                    <select
                      value={editInterviewStatus}
                      onChange={(e) =>
                        setEditInterviewStatus(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-64"
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

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Notes
                    </label>

                    <textarea
                      value={editInterviewNotes}
                      onChange={(e) =>
                        setEditInterviewNotes(
                          e.target.value
                        )
                      }
                      placeholder="Interview notes..."
                      rows="4"
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <Button
                      type="submit"
                      disabled={savingInterview}
                    >
                      {savingInterview
                        ? 'Saving...'
                        : 'Save Changes'}
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={
                        handleCancelInterviewEdit
                      }
                    >
                      Cancel
                    </Button>

                  </div>

                </form>

              ) : (

                /* ==================== NORMAL INTERVIEW VIEW ==================== */

                <>

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                        📅
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-xl font-semibold">
                            Interview
                          </h3>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              interview.status ===
                              'SCHEDULED'
                                ? 'border-blue-500/20 bg-blue-500/10 text-blue-400'
                                : interview.status ===
                                  'COMPLETED'
                                  ? 'border-green-500/20 bg-green-500/10 text-green-400'
                                  : 'border-red-500/20 bg-red-500/10 text-red-400'
                            }`}
                          >
                            {interview.status}
                          </span>

                        </div>

                        <div className="mt-4 space-y-2 text-sm">

                          <p className="text-slate-300">
                            👤 Candidate ID:{' '}
                            <span className="text-slate-400">
                              {interview.candidateId}
                            </span>
                          </p>

                          <p className="text-slate-300">
                            📋 Application ID:{' '}
                            <span className="text-slate-400">
                              {interview.applicationId}
                            </span>
                          </p>

                          <p className="text-slate-300">
                            🕐 Scheduled At:{' '}
                            <span className="text-slate-400">
                              {new Date(
                                interview.scheduledAt
                              ).toLocaleString()}
                            </span>
                          </p>

                          {interview.meetingLink && (
                            <p>
                              🔗{' '}
                              <a
                                href={
                                  interview.meetingLink
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                              >
                                Join Meeting
                              </a>
                            </p>
                          )}

                          {interview.notes && (
                            <p className="text-slate-300">
                              📝 Notes:{' '}
                              <span className="text-slate-400">
                                {interview.notes}
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
                          handleEditInterview(
                            interview
                          )
                        }
                        disabled={isProcessing}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleDeleteInterview(
                            interview
                          )
                        }
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? 'Cancelling...'
                          : 'Cancel Interview'}
                      </Button>

                    </div>

                  </div>

                </>

              )}

            </div>

          )
        })}

      </div>

    )}

  </div>

</section>
        {/* ================= APPLICATIONS ================= */}

        <section className="mt-12">

          <div>

            <p className="text-sm font-medium text-blue-400">
              Candidate Management
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Applications
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Review candidates and update their application status.
            </p>

          </div>

          <div className="mt-6">

            {applications.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">

                <div className="text-4xl">
                  📋
                </div>

                <h3 className="mt-4 font-semibold">
                  No applications yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Applications from candidates will appear here.
                </p>

              </div>

            ) : (

              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                {applications.map((application, index) => {

                  const isProcessing =
                    processingApplication ===
                    application.id

                  const statusStyles =
                    application.status === 'SHORTLISTED'
                      ? 'border-green-500/20 bg-green-500/10 text-green-400'
                      : application.status === 'REJECTED'
                        ? 'border-red-500/20 bg-red-500/10 text-red-400'
                        : 'border-blue-500/20 bg-blue-500/10 text-blue-400'

                  return (

                    <div
                      key={application.id}
                      className={`p-5 ${
                        index !== applications.length - 1
                          ? 'border-b border-slate-800'
                          : ''
                      }`}
                    >

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex items-start gap-4">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                            👤
                          </div>

                          <div>

                            <h3 className="font-semibold">
                              Candidate Application
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                              Candidate ID: {application.candidateId}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Application ID: {application.id}
                            </p>

                          </div>

                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                          <span
                            className={`w-fit rounded-full border px-3 py-1.5 text-xs font-medium ${statusStyles}`}
                          >
                            {application.status}
                          </span>

                          <div className="flex gap-2">

                            <Button
                              onClick={() =>
                                handleStatusChange(
                                  application.id,
                                  'SHORTLISTED'
                                )
                              }
                              disabled={isProcessing}
                            >
                              {isProcessing
                                ? 'Updating...'
                                : 'Shortlist'}
                            </Button>

                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleStatusChange(
                                  application.id,
                                  'REJECTED'
                                )
                              }
                              disabled={isProcessing}
                            >
                              Reject
                            </Button>

                          </div>

                        </div>

                      </div>

                    </div>

                  )
                })}

              </div>

            )}

          </div>

        </section>

<InterviewManagement
  recruiterId={recruiterId}
  applications={applications}
/>
        {/* ================= FOOTER ================= */}

        <footer className="mt-16 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TalentFlow. Recruiter Portal.
        </footer>

      </main>

    </div>
  )
}

export default RecruiterDashboard

