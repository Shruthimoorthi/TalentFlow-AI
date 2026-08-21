import { useEffect, useState } from 'react'

import Button from '../Button'

import {
  createInterview,
  getInterviewsByRecruiter,
  updateInterview,
  deleteInterview,
} from '../../services/api'

function InterviewManagement({
  recruiterId,
  applications,
}) {
  const [interviews, setInterviews] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ==================== FORM STATE ====================

  const [showScheduleForm, setShowScheduleForm] =
    useState(false)

  const [selectedApplication, setSelectedApplication] =
    useState(null)

  const [scheduledAt, setScheduledAt] = useState('')
  const [meetingLink, setMeetingLink] = useState('')

  const [creatingInterview, setCreatingInterview] =
    useState(false)

  // ==================== EDIT STATE ====================

  const [editingInterviewId, setEditingInterviewId] =
    useState(null)

  const [editScheduledAt, setEditScheduledAt] =
    useState('')

  const [editMeetingLink, setEditMeetingLink] =
    useState('')

  const [editStatus, setEditStatus] =
    useState('SCHEDULED')

  const [editNotes, setEditNotes] =
    useState('')

  const [savingInterview, setSavingInterview] =
    useState(false)

  const [deletingInterviewId, setDeletingInterviewId] =
    useState(null)

  // ==================== LOAD INTERVIEWS ====================

  const loadInterviews = async () => {
    try {
      setLoading(true)
      setError('')

      const data =
        await getInterviewsByRecruiter(recruiterId)

      setInterviews(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!recruiterId) {
      return
    }

    loadInterviews()
  }, [recruiterId])

  // ==================== OPEN SCHEDULE FORM ====================

  const handleScheduleClick = (application) => {
    setSelectedApplication(application)

    setScheduledAt('')
    setMeetingLink('')

    setShowScheduleForm(true)
    setError('')
  }

  // ==================== CLOSE SCHEDULE FORM ====================

  const handleCancelSchedule = () => {
    setShowScheduleForm(false)

    setSelectedApplication(null)

    setScheduledAt('')
    setMeetingLink('')
  }

  // ==================== CREATE INTERVIEW ====================

  const handleCreateInterview = async (event) => {
    event.preventDefault()

    if (!selectedApplication) {
      return
    }

    try {
      setCreatingInterview(true)
      setError('')

      await createInterview({
        applicationId:
          selectedApplication.id,

        recruiterId,

        candidateId:
          selectedApplication.candidateId,

        scheduledAt,

        meetingLink,
      })

      handleCancelSchedule()

      await loadInterviews()
    } catch (error) {
      setError(error.message)
    } finally {
      setCreatingInterview(false)
    }
  }

  // ==================== START EDIT ====================

  const handleEditClick = (interview) => {
    setEditingInterviewId(interview.id)

    setEditScheduledAt(
      formatDateTimeForInput(
        interview.scheduledAt
      )
    )

    setEditMeetingLink(
      interview.meetingLink || ''
    )

    setEditStatus(
      interview.status || 'SCHEDULED'
    )

    setEditNotes(
      interview.notes || ''
    )
  }

  // ==================== CANCEL EDIT ====================

  const handleCancelEdit = () => {
    setEditingInterviewId(null)

    setEditScheduledAt('')
    setEditMeetingLink('')
    setEditStatus('SCHEDULED')
    setEditNotes('')
  }

  // ==================== UPDATE INTERVIEW ====================

  const handleUpdateInterview = async (event) => {
    event.preventDefault()

    const existingInterview =
      interviews.find(
        (interview) =>
          interview.id === editingInterviewId
      )

    if (!existingInterview) {
      return
    }

    try {
      setSavingInterview(true)
      setError('')

      await updateInterview(
        editingInterviewId,
        {
          applicationId:
            existingInterview.applicationId,

          recruiterId:
            existingInterview.recruiterId,

          candidateId:
            existingInterview.candidateId,

          scheduledAt: editScheduledAt,

          meetingLink: editMeetingLink,

          status: editStatus,

          notes: editNotes,
        }
      )

      handleCancelEdit()

      await loadInterviews()
    } catch (error) {
      setError(error.message)
    } finally {
      setSavingInterview(false)
    }
  }

  // ==================== DELETE INTERVIEW ====================

  const handleDeleteInterview = async (
    interview
  ) => {
    if (
      !window.confirm(
        'Are you sure you want to cancel this interview?'
      )
    ) {
      return
    }

    try {
      setDeletingInterviewId(interview.id)
      setError('')

      await deleteInterview(interview.id)

      await loadInterviews()
    } catch (error) {
      setError(error.message)
    } finally {
      setDeletingInterviewId(null)
    }
  }

  // ==================== LOADING ====================

  if (loading) {
    return (
      <section className="mt-12">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Interview Management
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Interviews
          </h2>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading interviews...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-12">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Interview Management
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Interviews
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Schedule and manage candidate interviews.
          </p>
        </div>

        <button
          onClick={loadInterviews}
          className="text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ↻ Refresh
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          <span>{error}</span>

          <button
            onClick={loadInterviews}
            className="font-medium text-red-300 hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* ================= SCHEDULE FORM ================= */}

      {showScheduleForm &&
        selectedApplication && (
          <form
            onSubmit={handleCreateInterview}
            className="mt-6 rounded-2xl border border-blue-500/20 bg-slate-900 p-6 shadow-lg"
          >
            <div>
              <p className="text-sm font-medium text-blue-400">
                Schedule Interview
              </p>

              <h3 className="mt-1 text-xl font-semibold">
                Candidate Interview
              </h3>
            </div>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                Candidate ID
              </p>

              <p className="mt-1 font-medium">
                {selectedApplication.candidateId}
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Application ID
              </p>

              <p className="mt-1 font-medium">
                {selectedApplication.id}
              </p>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Interview Date & Time
              </label>

              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(event) =>
                  setScheduledAt(
                    event.target.value
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
                placeholder="https://meet.google.com/..."
                value={meetingLink}
                onChange={(event) =>
                  setMeetingLink(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                type="submit"
                disabled={creatingInterview}
              >
                {creatingInterview
                  ? 'Scheduling...'
                  : 'Schedule Interview'}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelSchedule}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

      {/* ================= UPCOMING INTERVIEWS ================= */}

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
              Schedule an interview from a candidate application.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {interviews.map((interview) => {
              const isEditing =
                editingInterviewId ===
                interview.id

              const isDeleting =
                deletingInterviewId ===
                interview.id

              return (
                <div
                  key={interview.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
                >
                  {/* ================= EDIT MODE ================= */}

                  {isEditing ? (
                    <form
                      onSubmit={
                        handleUpdateInterview
                      }
                    >
                      <div>
                        <p className="text-sm font-medium text-blue-400">
                          Interview Management
                        </p>

                        <h3 className="mt-1 text-xl font-semibold">
                          Edit Interview
                        </h3>
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Date & Time
                        </label>

                        <input
                          type="datetime-local"
                          value={
                            editScheduledAt
                          }
                          onChange={(event) =>
                            setEditScheduledAt(
                              event.target.value
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
                          value={
                            editMeetingLink
                          }
                          onChange={(event) =>
                            setEditMeetingLink(
                              event.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Status
                        </label>

                        <select
                          value={editStatus}
                          onChange={(event) =>
                            setEditStatus(
                              event.target.value
                            )
                          }
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                          value={editNotes}
                          onChange={(event) =>
                            setEditNotes(
                              event.target.value
                            )
                          }
                          rows="4"
                          placeholder="Add interview notes..."
                          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                            handleCancelEdit
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    /* ================= NORMAL VIEW ================= */

                    <>
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                            📅
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-xl font-semibold">
                                Candidate Interview
                              </h3>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(
                                  interview.status
                                )}`}
                              >
                                {interview.status ||
                                  'SCHEDULED'}
                              </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm">
                              <p className="text-slate-300">
                                <span className="text-slate-500">
                                  Candidate:
                                </span>{' '}
                                {
                                  interview.candidateId
                                }
                              </p>

                              <p className="text-slate-300">
                                <span className="text-slate-500">
                                  Application:
                                </span>{' '}
                                {
                                  interview.applicationId
                                }
                              </p>

                              <p className="text-slate-300">
                                <span className="text-slate-500">
                                  Scheduled:
                                </span>{' '}
                                {formatDateTime(
                                  interview.scheduledAt
                                )}
                              </p>
                            </div>

                            {interview.meetingLink && (
                              <a
                                href={
                                  interview.meetingLink
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
                              >
                                🔗 Join Meeting
                              </a>
                            )}

                            {interview.notes && (
                              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                  Notes
                                </p>

                                <p className="mt-2 text-sm text-slate-300">
                                  {
                                    interview.notes
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 lg:justify-end">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleEditClick(
                                interview
                              )
                            }
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
                            disabled={isDeleting}
                          >
                            {isDeleting
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

      {/* ================= SCHEDULE FROM APPLICATIONS ================= */}

      {applications.length > 0 && (
        <div className="mt-8">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Candidate Applications
            </p>

            <h3 className="mt-1 text-xl font-semibold">
              Schedule an Interview
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Choose a candidate application to schedule an interview.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {applications.map(
              (application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="font-semibold">
                      Candidate Application
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Candidate ID:{' '}
                      {
                        application.candidateId
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Application ID:{' '}
                      {application.id}
                    </p>

                    <span
                      className={`mt-3 inline-block rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <Button
                    onClick={() =>
                      handleScheduleClick(
                        application
                      )
                    }
                  >
                    + Schedule Interview
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </section>
  )
}

// ==================== HELPERS ====================

function formatDateTime(value) {
  if (!value) {
    return 'Not scheduled'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function formatDateTimeForInput(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (number) =>
    String(number).padStart(2, '0')

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

function getStatusStyles(status) {
  if (status === 'SHORTLISTED') {
    return 'border-green-500/20 bg-green-500/10 text-green-400'
  }

  if (status === 'REJECTED') {
    return 'border-red-500/20 bg-red-500/10 text-red-400'
  }

  if (status === 'COMPLETED') {
    return 'border-green-500/20 bg-green-500/10 text-green-400'
  }

  if (status === 'CANCELLED') {
    return 'border-red-500/20 bg-red-500/10 text-red-400'
  }

  return 'border-blue-500/20 bg-blue-500/10 text-blue-400'
}

export default InterviewManagement