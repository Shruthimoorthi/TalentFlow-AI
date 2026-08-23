import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RecruiterSidebar from '../components/recruiter/RecruiterSidebar'
import RecruiterHeader from '../components/recruiter/RecruiterHeader'
import RecruiterOverview from '../components/recruiter/RecruiterOverview'
import JobCreationSection from '../components/recruiter/JobCreationSection'
import JobsManagementSection from '../components/recruiter/JobsManagementSection'
import ApplicationsSection from '../components/recruiter/ApplicationsSection'
import InterviewSection from '../components/recruiter/InterviewSection'
import RecruiterSettings from '../components/recruiter/RecruiterSettings'

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

  const recruiterId =
    localStorage.getItem('userId')

  const name =
    localStorage.getItem('name') ||
    'Recruiter'

  const email =
    localStorage.getItem('email') || ''

  const role =
    localStorage.getItem('role') ||
    'RECRUITER'

  // =========================================================
  // DASHBOARD STATE
  // =========================================================

  const [
    activeSection,
    setActiveSection,
  ] = useState('overview')

  const [
    jobs,
    setJobs,
  ] = useState([])

  const [
    applications,
    setApplications,
  ] = useState([])

  const [
    interviews,
    setInterviews,
  ] = useState([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState('')

  // =========================================================
  // JOB CREATE STATE
  // =========================================================

  const [
    title,
    setTitle,
  ] = useState('')

  const [
    description,
    setDescription,
  ] = useState('')

  const [
    location,
    setLocation,
  ] = useState('')

  const [
    employmentType,
    setEmploymentType,
  ] = useState('FULL_TIME')

  const [
    creatingJob,
    setCreatingJob,
  ] = useState(false)

  // =========================================================
  // JOB EDIT STATE
  // =========================================================

  const [
    editingJobId,
    setEditingJobId,
  ] = useState(null)

  const [
    editTitle,
    setEditTitle,
  ] = useState('')

  const [
    editDescription,
    setEditDescription,
  ] = useState('')

  const [
    editLocation,
    setEditLocation,
  ] = useState('')

  const [
    editEmploymentType,
    setEditEmploymentType,
  ] = useState('FULL_TIME')

  const [
    savingJob,
    setSavingJob,
  ] = useState(false)

  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const [
    processingApplication,
    setProcessingApplication,
  ] = useState(null)

  // =========================================================
  // INTERVIEW STATE
  // =========================================================

  const [
    selectedApplication,
    setSelectedApplication,
  ] = useState(null)

  const [
    interviewDate,
    setInterviewDate,
  ] = useState('')

  const [
    meetingLink,
    setMeetingLink,
  ] = useState('')

  const [
    creatingInterview,
    setCreatingInterview,
  ] = useState(false)

  const [
    processingInterview,
    setProcessingInterview,
  ] = useState(null)

  const [
    editingInterviewId,
    setEditingInterviewId,
  ] = useState(null)

  const [
    editInterviewDate,
    setEditInterviewDate,
  ] = useState('')

  const [
    editMeetingLink,
    setEditMeetingLink,
  ] = useState('')

  const [
    editInterviewStatus,
    setEditInterviewStatus,
  ] = useState('SCHEDULED')

  const [
    editInterviewNotes,
    setEditInterviewNotes,
  ] = useState('')

  const [
    savingInterview,
    setSavingInterview,
  ] = useState(false)

  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const jobsData =
        await getJobs()

      const ownJobs =
        (jobsData || []).filter(
          (job) =>
            job.recruiterId ===
            recruiterId
        )

      setJobs(ownJobs)

      const allApplications = []

      for (const job of ownJobs) {
        const jobApplications =
          await getJobApplications(
            job.id
          )

        allApplications.push(
          ...(jobApplications || [])
        )
      }

      setApplications(
        allApplications
      )

      const interviewData =
        await getInterviewsByRecruiter(
          recruiterId
        )

      setInterviews(
        interviewData || []
      )
    } catch (error) {
      setError(
        error.message ||
        'Failed to load recruiter dashboard'
      )
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

  // =========================================================
  // SECTION NAVIGATION
  // =========================================================

  useEffect(() => {
    if (
      activeSection ===
      'overview'
    ) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    const element =
      document.getElementById(
        activeSection
      )

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [activeSection])

  // =========================================================
  // CREATE JOB
  // =========================================================

  const handleCreateJob =
    async (event) => {
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
        setEmploymentType(
          'FULL_TIME'
        )

        await loadDashboard()

        setActiveSection(
          'jobs'
        )
      } catch (error) {
        setError(
          error.message ||
          'Failed to create job'
        )
      } finally {
        setCreatingJob(false)
      }
    }

  // =========================================================
  // START JOB EDIT
  // =========================================================

  const handleEditClick = (
    job
  ) => {
    setEditingJobId(job.id)

    setEditTitle(
      job.title || ''
    )

    setEditDescription(
      job.description || ''
    )

    setEditLocation(
      job.location || ''
    )

    setEditEmploymentType(
      job.employmentType ||
      'FULL_TIME'
    )
  }

  // =========================================================
  // CANCEL JOB EDIT
  // =========================================================

  const handleCancelEdit = () => {
    setEditingJobId(null)

    setEditTitle('')
    setEditDescription('')
    setEditLocation('')

    setEditEmploymentType(
      'FULL_TIME'
    )
  }

  // =========================================================
  // UPDATE JOB
  // =========================================================

  const handleUpdateJob =
    async (event) => {
      event.preventDefault()

      try {
        setSavingJob(true)
        setError('')

        const currentJob =
          jobs.find(
            (job) =>
              job.id ===
              editingJobId
          )

        if (!currentJob) {
          throw new Error(
            'Job not found'
          )
        }

        await updateJob(
          editingJobId,
          {
            title: editTitle,
            description:
              editDescription,
            location:
              editLocation,
            employmentType:
              editEmploymentType,
            status:
              currentJob.status ||
              'OPEN',
          }
        )

        handleCancelEdit()

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to update job'
        )
      } finally {
        setSavingJob(false)
      }
    }

  // =========================================================
  // CLOSE JOB
  // =========================================================

  const handleCloseJob =
    async (job) => {
      if (
        !window.confirm(
          `Are you sure you want to close "${job.title}"?`
        )
      ) {
        return
      }

      try {
        setError('')

        await updateJob(
          job.id,
          {
            title:
              job.title,
            description:
              job.description,
            location:
              job.location,
            employmentType:
              job.employmentType,
            status:
              'CLOSED',
          }
        )

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to close job'
        )
      }
    }

  // =========================================================
  // DELETE JOB
  // =========================================================

  const handleDeleteJob =
    async (job) => {
      if (
        !window.confirm(
          `Are you sure you want to permanently delete "${job.title}"?`
        )
      ) {
        return
      }

      try {
        setError('')

        await deleteJob(
          job.id
        )

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to delete job'
        )
      }
    }

  // =========================================================
  // UPDATE APPLICATION STATUS
  // =========================================================

  const handleStatusChange =
    async (
      applicationId,
      status
    ) => {
      try {
        setProcessingApplication(
          applicationId
        )

        setError('')

        await updateApplicationStatus(
          applicationId,
          status
        )

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to update application'
        )
      } finally {
        setProcessingApplication(
          null
        )
      }
    }

  // =========================================================
  // SELECT APPLICATION
  // =========================================================

  const handleSelectApplication =
    (applicationId) => {
      const application =
        applications.find(
          (item) =>
            item.id ===
            applicationId
        )

      setSelectedApplication(
        application || null
      )
    }

  // =========================================================
  // CREATE INTERVIEW
  // =========================================================

  const handleCreateInterview =
    async (event) => {
      event.preventDefault()

      if (!selectedApplication) {
        setError(
          'Please select a candidate application.'
        )

        return
      }

      try {
        setCreatingInterview(
          true
        )

        setError('')

        await createInterview({
          applicationId:
            selectedApplication.id,

          recruiterId,

          candidateId:
            selectedApplication.candidateId,

          scheduledAt:
            interviewDate,

          meetingLink,
        })

        setSelectedApplication(
          null
        )

        setInterviewDate('')
        setMeetingLink('')

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to schedule interview'
        )
      } finally {
        setCreatingInterview(
          false
        )
      }
    }

  // =========================================================
  // START INTERVIEW EDIT
  // =========================================================

  const handleEditInterview =
    (interview) => {
      setEditingInterviewId(
        interview.id
      )

      setEditInterviewDate(
        interview.scheduledAt ||
        ''
      )

      setEditMeetingLink(
        interview.meetingLink ||
        ''
      )

      setEditInterviewStatus(
        interview.status ||
        'SCHEDULED'
      )

      setEditInterviewNotes(
        interview.notes ||
        ''
      )
    }

  // =========================================================
  // CANCEL INTERVIEW EDIT
  // =========================================================

  const handleCancelInterviewEdit =
    () => {
      setEditingInterviewId(
        null
      )

      setEditInterviewDate('')
      setEditMeetingLink('')

      setEditInterviewStatus(
        'SCHEDULED'
      )

      setEditInterviewNotes('')
    }

  // =========================================================
  // UPDATE INTERVIEW
  // =========================================================

  const handleUpdateInterview =
    async (event) => {
      event.preventDefault()

      try {
        setSavingInterview(
          true
        )

        setError('')

        const currentInterview =
          interviews.find(
            (interview) =>
              interview.id ===
              editingInterviewId
          )

        if (!currentInterview) {
          throw new Error(
            'Interview not found'
          )
        }

        await updateInterview(
          editingInterviewId,
          {
            applicationId:
              currentInterview.applicationId,

            recruiterId:
              currentInterview.recruiterId ||
              recruiterId,

            candidateId:
              currentInterview.candidateId,

            scheduledAt:
              editInterviewDate,

            meetingLink:
              editMeetingLink,

            status:
              editInterviewStatus,

            notes:
              editInterviewNotes,
          }
        )

        handleCancelInterviewEdit()

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to update interview'
        )
      } finally {
        setSavingInterview(
          false
        )
      }
    }

  // =========================================================
  // DELETE INTERVIEW
  // =========================================================

  const handleDeleteInterview =
    async (interview) => {
      if (
        !window.confirm(
          'Are you sure you want to cancel this interview?'
        )
      ) {
        return
      }

      try {
        setProcessingInterview(
          interview.id
        )

        setError('')

        await deleteInterview(
          interview.id
        )

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to cancel interview'
        )
      } finally {
        setProcessingInterview(
          null
        )
      }
    }

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // =========================================================
  // STATS
  // =========================================================

  const openJobs =
    jobs.filter(
      (job) =>
        job.status === 'OPEN'
    ).length

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status ===
        'SHORTLISTED'
    ).length

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading recruiter dashboard...
          </p>

        </div>

      </div>
    )
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <RecruiterSidebar
        activeSection={
          activeSection
        }
        setActiveSection={
          setActiveSection
        }
        onLogout={
          handleLogout
        }
      />

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-64">

        <RecruiterHeader
          name={name}
          activeSection={
            activeSection
          }
        />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* =================================================
              OVERVIEW
          ================================================= */}

          <RecruiterOverview
            name={name}
            jobs={jobs}
            applications={
              applications
            }
            interviews={
              interviews
            }
            openJobs={
              openJobs
            }
            shortlistedApplications={
              shortlistedApplications
            }
          />

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={
                  loadDashboard
                }
                className="font-semibold text-red-700 hover:text-red-900"
              >
                Retry
              </button>

            </div>
          )}

          {/* =================================================
              JOB CREATION
          ================================================= */}

          <JobCreationSection
            title={title}
            description={
              description
            }
            location={location}
            employmentType={
              employmentType
            }
            creatingJob={
              creatingJob
            }
            onTitleChange={
              setTitle
            }
            onDescriptionChange={
              setDescription
            }
            onLocationChange={
              setLocation
            }
            onEmploymentTypeChange={
              setEmploymentType
            }
            onSubmit={
              handleCreateJob
            }
          />

          {/* =================================================
              JOB MANAGEMENT
          ================================================= */}

          <JobsManagementSection
            jobs={jobs}
            editingJobId={
              editingJobId
            }
            editTitle={editTitle}
            editDescription={
              editDescription
            }
            editLocation={
              editLocation
            }
            editEmploymentType={
              editEmploymentType
            }
            savingJob={
              savingJob
            }
            onEditClick={
              handleEditClick
            }
            onCancelEdit={
              handleCancelEdit
            }
            onUpdateJob={
              handleUpdateJob
            }
            onTitleChange={
              setEditTitle
            }
            onDescriptionChange={
              setEditDescription
            }
            onLocationChange={
              setEditLocation
            }
            onEmploymentTypeChange={
              setEditEmploymentType
            }
            onCloseJob={
              handleCloseJob
            }
            onDeleteJob={
              handleDeleteJob
            }
            onRefresh={
              loadDashboard
            }
          />

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          <ApplicationsSection
            applications={
              applications
            }
            processingApplication={
              processingApplication
            }
            onStatusChange={
              handleStatusChange
            }
          />

          {/* =================================================
              INTERVIEWS
          ================================================= */}

          <InterviewSection
            recruiterId={
              recruiterId
            }
            applications={
              applications
            }
            interviews={
              interviews
            }
            selectedApplication={
              selectedApplication
            }
            interviewDate={
              interviewDate
            }
            meetingLink={
              meetingLink
            }
            creatingInterview={
              creatingInterview
            }
            processingInterview={
              processingInterview
            }
            editingInterviewId={
              editingInterviewId
            }
            editInterviewDate={
              editInterviewDate
            }
            editMeetingLink={
              editMeetingLink
            }
            editInterviewStatus={
              editInterviewStatus
            }
            editInterviewNotes={
              editInterviewNotes
            }
            savingInterview={
              savingInterview
            }
            onSelectApplication={
              handleSelectApplication
            }
            onInterviewDateChange={
              setInterviewDate
            }
            onMeetingLinkChange={
              setMeetingLink
            }
            onCreateInterview={
              handleCreateInterview
            }
            onEditInterview={
              handleEditInterview
            }
            onCancelInterviewEdit={
              handleCancelInterviewEdit
            }
            onUpdateInterview={
              handleUpdateInterview
            }
            onEditInterviewDateChange={
              setEditInterviewDate
            }
            onEditMeetingLinkChange={
              setEditMeetingLink
            }
            onEditInterviewStatusChange={
              setEditInterviewStatus
            }
            onEditInterviewNotesChange={
              setEditInterviewNotes
            }
            onDeleteInterview={
              handleDeleteInterview
            }
            onRefresh={
              loadDashboard
            }
          />

          {/* =================================================
              SETTINGS
          ================================================= */}

          {activeSection ===
            'settings' && (
            <section
              id="settings"
              className="scroll-mt-24 pt-16"
            >
              <RecruiterSettings
                name={name}
                email={email}
                role={role}
              />
            </section>
          )}

        </main>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer className="border-t border-slate-200 bg-white">

          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

            <p>
              ©{' '}
              {new Date().getFullYear()}{' '}
              TalentFlow. All rights reserved.
            </p>

            <p>
              AI-powered recruitment &
              applicant tracking.
            </p>

          </div>

        </footer>

      </div>

    </div>
  )
}

export default RecruiterDashboard
