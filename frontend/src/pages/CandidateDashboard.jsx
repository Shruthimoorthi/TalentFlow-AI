import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CandidateSidebar from '../components/candidate/CandidateSidebar'
import CandidateHeader from '../components/candidate/CandidateHeader'
import CandidateOverview from '../components/candidate/CandidateOverview'
import CandidateSettings from '../components/candidate/CandidateSettings'
import ResumeSection from '../components/candidate/ResumeSection'
import JobsSection from '../components/candidate/JobsSection'
import ApplicationsSection from '../components/candidate/ApplicationsSection'
import InterviewsSection from '../components/candidate/InterviewsSection'

import {
  getJobs,
  getCandidateApplications,
  applyForJob,
  getResumesByCandidate,
  updateResume,
  deleteResume,
  uploadResumeFile,
  getInterviewsByCandidate,
  analyzeResume,
  matchResumeToJob,
  logout,
} from '../services/api'

function CandidateDashboard() {
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')
  const name =
    localStorage.getItem('name') || 'Candidate'

  // =========================================================
  // DASHBOARD STATE
  // =========================================================

  const [activeSection, setActiveSection] =
    useState('overview')

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] =
    useState([])
  const [resumes, setResumes] = useState([])
  const [interviews, setInterviews] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [search, setSearch] =
    useState('')

  // =========================================================
  // RESUME STATE
  // =========================================================

  const [showResumeForm, setShowResumeForm] =
    useState(false)

  const [editingResumeId, setEditingResumeId] =
    useState(null)

  const [resumeFileName, setResumeFileName] =
    useState('')

  const [resumeFile, setResumeFile] =
    useState(null)

  const [resumeSummary, setResumeSummary] =
    useState('')

  const [resumeSkills, setResumeSkills] =
    useState('')

  const [savingResume, setSavingResume] =
    useState(false)

  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const [applyingJobId, setApplyingJobId] =
    useState(null)

  // =========================================================
  // AI STATE
  // =========================================================

  const [
    analyzingResumeId,
    setAnalyzingResumeId,
  ] = useState(null)

  const [
    matchingResumeId,
    setMatchingResumeId,
  ] = useState(null)

  const [
    selectedJobForMatch,
    setSelectedJobForMatch,
  ] = useState({})

  const [
    jobMatchResults,
    setJobMatchResults,
  ] = useState({})

  const [
    analysisResults,
    setAnalysisResults,
  ] = useState({})

  // =========================================================
  // LOAD DASHBOARD
  // =========================================================

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const [
        jobsData,
        applicationsData,
        resumesData,
        interviewsData,
      ] = await Promise.all([
        getJobs(),
        getCandidateApplications(userId),
        getResumesByCandidate(userId),
        getInterviewsByCandidate(userId),
      ])

      setJobs(jobsData || [])
      setApplications(
        applicationsData || []
      )
      setResumes(resumesData || [])
      setInterviews(
        interviewsData || []
      )
    } catch (error) {
      setError(
        error.message ||
        'Failed to load dashboard'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }

    loadDashboard()
  }, [])

  // =========================================================
  // SECTION NAVIGATION
  // =========================================================

  useEffect(() => {
  const timer = setTimeout(() => {
    if (activeSection === 'overview') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    const element =
      document.getElementById(activeSection)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, 100)

  return () => clearTimeout(timer)
}, [activeSection])

  // =========================================================
  // JOB HELPERS
  // =========================================================

  const getApplicationForJob = (
    jobId
  ) => {
    return applications.find(
      (application) =>
        application.jobId === jobId
    )
  }

  // =========================================================
  // APPLY
  // =========================================================

  const handleApply = async (
    jobId
  ) => {
    try {
      setApplyingJobId(jobId)
      setError('')

      const resumeId =
        resumes.length > 0
          ? resumes[0].id
          : null

      await applyForJob(
        jobId,
        userId,
        resumeId
      )

      await loadDashboard()
    } catch (error) {
      setError(
        error.message ||
        'Failed to apply'
      )
    } finally {
      setApplyingJobId(null)
    }
  }

  // =========================================================
  // RESUME FORM
  // =========================================================

  const resetResumeForm = () => {
    setResumeFileName('')
    setResumeFile(null)
    setResumeSummary('')
    setResumeSkills('')
    setEditingResumeId(null)
    setShowResumeForm(false)
  }

  const handleCreateResume = () => {
    setEditingResumeId(null)
    setResumeFileName('')
    setResumeFile(null)
    setResumeSummary('')
    setResumeSkills('')
    setShowResumeForm(true)
  }

  const handleEditResume = (
    resume
  ) => {
    setEditingResumeId(
      resume.id
    )

    setResumeFileName(
      resume.fileName || ''
    )

    setResumeFile(null)

    setResumeSummary(
      resume.summary || ''
    )

    setResumeSkills(
      Array.isArray(resume.skills)
        ? resume.skills.join(', ')
        : ''
    )

    setShowResumeForm(true)
  }

  const handleSaveResume =
    async (event) => {
      event.preventDefault()

      try {
        setSavingResume(true)
        setError('')

        if (!editingResumeId) {
          if (!resumeFile) {
            throw new Error(
              'Please select a PDF resume'
            )
          }

          await uploadResumeFile(
            userId,
            resumeFile,
            resumeSummary,
            resumeSkills
          )
        } else {
          const resumeData = {
            fileName:
              resumeFileName,

            summary:
              resumeSummary,

            skills:
              resumeSkills
                .split(',')
                .map((skill) =>
                  skill.trim()
                )
                .filter(Boolean),
          }

          await updateResume(
            editingResumeId,
            resumeData
          )
        }

        resetResumeForm()

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to save resume'
        )
      } finally {
        setSavingResume(false)
      }
    }

  // =========================================================
  // RESUME FILE CHANGE
  // =========================================================

  const handleResumeFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0] ||
      null

    setResumeFile(file)

    if (file) {
      setResumeFileName(
        file.name
      )
    }
  }

  // =========================================================
  // DELETE RESUME
  // =========================================================

  const handleDeleteResume =
    async (resume) => {
      const confirmed =
        window.confirm(
          `Delete "${resume.fileName}"?`
        )

      if (!confirmed) {
        return
      }

      try {
        setError('')

        await deleteResume(
          resume.id
        )

        await loadDashboard()
      } catch (error) {
        setError(
          error.message ||
          'Failed to delete resume'
        )
      }
    }

  // =========================================================
  // VIEW RESUME
  // =========================================================

  const handleViewResume = (
    resume
  ) => {
    if (!resume.fileUrl) {
      setError(
        'Resume file is not available'
      )

      return
    }

    const backendUrl =
      'http://localhost:8080'

    const resumeUrl =
      resume.fileUrl.startsWith(
        'http'
      )
        ? resume.fileUrl
        : `${backendUrl}${resume.fileUrl}`

    window.open(
      resumeUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // =========================================================
  // AI RESUME ANALYSIS
  // =========================================================

  const handleAnalyzeResume =
    async (resume) => {
      try {
        setAnalyzingResumeId(
          resume.id
        )

        setError('')

        const result =
          await analyzeResume(
            resume.id
          )

        setAnalysisResults(
          (previous) => ({
            ...previous,
            [resume.id]:
              result,
          })
        )
      } catch (error) {
        setError(
          error.message ||
          'Failed to analyze resume'
        )
      } finally {
        setAnalyzingResumeId(
          null
        )
      }
    }

  // =========================================================
  // AI JOB MATCH
  // =========================================================

  const handleMatchResumeToJob =
    async (
      resume,
      jobId
    ) => {
      if (!jobId) {
        setError(
          'Please select a job'
        )

        return
      }

      try {
        setMatchingResumeId(
          resume.id
        )

        setError('')

        const result =
          await matchResumeToJob(
            resume.id,
            jobId
          )

        setJobMatchResults(
          (previous) => ({
            ...previous,

            [resume.id]: {
              ...(previous[
                resume.id
              ] || {}),

              [jobId]:
                result,
            },
          })
        )
      } catch (error) {
        setError(
          error.message ||
          'Failed to match resume to job'
        )
      } finally {
        setMatchingResumeId(
          null
        )
      }
    }

  // =========================================================
  // JOB MATCH SELECTION
  // =========================================================

  const handleSelectJobForMatch =
    (
      resumeId,
      jobId
    ) => {
      setSelectedJobForMatch(
        (previous) => ({
          ...previous,
          [resumeId]:
            jobId,
        })
      )
    }

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // =========================================================
  // FILTER JOBS
  // =========================================================

  const filteredJobs = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase()

    if (!query) {
      return jobs
    }

    return jobs.filter(
      (job) =>
        [
          job.title,
          job.description,
          job.location,
          job.employmentType,
        ]
          .filter(Boolean)
          .some((value) =>
            value
              .toLowerCase()
              .includes(query)
          )
    )
  }, [jobs, search])

  // =========================================================
  // STATUS STYLES
  // =========================================================

  const getStatusStyles = (
    status
  ) => {
    switch (status) {
      case 'SHORTLISTED':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'

      case 'REJECTED':
        return 'border-red-200 bg-red-50 text-red-600'

      case 'APPLIED':
        return 'border-blue-200 bg-blue-50 text-blue-700'

      default:
        return 'border-slate-200 bg-slate-50 text-slate-600'
    }
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your dashboard...
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

      <CandidateSidebar
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

        <CandidateHeader
          name={name}
          activeSection={
            activeSection
          }
        />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {/* =================================================
              OVERVIEW
          ================================================= */}

          <div id="overview">

            <CandidateOverview
              name={name}
              jobs={jobs}
              applications={
                applications
              }
              resumes={resumes}
              interviews={
                interviews
              }
              analysisResults={
                analysisResults
              }
            />

          </div>

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
              RESUME
          ================================================= */}

          <ResumeSection
            resumes={resumes}
            jobs={jobs}

            showResumeForm={
              showResumeForm
            }

            editingResumeId={
              editingResumeId
            }

            resumeFileName={
              resumeFileName
            }

            resumeFile={
              resumeFile
            }

            resumeSummary={
              resumeSummary
            }

            resumeSkills={
              resumeSkills
            }

            savingResume={
              savingResume
            }

            analyzingResumeId={
              analyzingResumeId
            }

            matchingResumeId={
              matchingResumeId
            }

            selectedJobForMatch={
              selectedJobForMatch
            }

            analysisResults={
              analysisResults
            }

            jobMatchResults={
              jobMatchResults
            }

            onCreateResume={
              handleCreateResume
            }

            onEditResume={
              handleEditResume
            }

            onDeleteResume={
              handleDeleteResume
            }

            onViewResume={
              handleViewResume
            }

            onSaveResume={
              handleSaveResume
            }

            onResetResumeForm={
              resetResumeForm
            }

            onResumeFileChange={
              handleResumeFileChange
            }

            onResumeSummaryChange={
              setResumeSummary
            }

            onResumeSkillsChange={
              setResumeSkills
            }

            onAnalyzeResume={
              handleAnalyzeResume
            }

            onSelectJob={
              handleSelectJobForMatch
            }

            onMatchResumeToJob={
              handleMatchResumeToJob
            }
          />

          {/* =================================================
              JOBS
          ================================================= */}

          <JobsSection
            jobs={filteredJobs}
            search={search}
            onSearchChange={
              setSearch
            }
            getApplicationForJob={
              getApplicationForJob
            }
            applyingJobId={
              applyingJobId
            }
            onApply={
              handleApply
            }
            getStatusStyles={
              getStatusStyles
            }
          />

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          <ApplicationsSection
            applications={
              applications
            }
            jobs={jobs}
            getStatusStyles={
              getStatusStyles
            }
          />

          {/* =================================================
              INTERVIEWS
          ================================================= */}

          <InterviewsSection
            interviews={
              interviews
            }
            onRefresh={
              loadDashboard
            }
          />
          <CandidateSettings
  name={name}
  email={localStorage.getItem('email')}
  role={localStorage.getItem('role')}
/>

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

export default CandidateDashboard
