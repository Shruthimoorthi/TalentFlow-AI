import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'

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
  const name = localStorage.getItem('name') || 'Candidate'

  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [resumes, setResumes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [search, setSearch] = useState('')

  // ==================== RESUME STATE ====================

  const [showResumeForm, setShowResumeForm] = useState(false)

  const [editingResumeId, setEditingResumeId] = useState(null)

  const [resumeFileName, setResumeFileName] = useState('')
  const [resumeFile, setResumeFile] = useState(null)

  const [resumeSummary, setResumeSummary] = useState('')
  const [resumeSkills, setResumeSkills] = useState('')

  const [savingResume, setSavingResume] = useState(false)

  // ==================== APPLICATION STATE ====================

  const [applyingJobId, setApplyingJobId] = useState(null)
  // ==================== INTERVIEW STATE ====================

  const [interviews, setInterviews] = useState([])
  // ==================== LOAD DASHBOARD ====================
  const [analyzingResumeId, setAnalyzingResumeId] =
  useState(null)
  const [matchingResumeId, setMatchingResumeId] =
  useState(null)

const [selectedJobForMatch, setSelectedJobForMatch] =
  useState({})

const [jobMatchResults, setJobMatchResults] =
  useState({})
const [analysisResults, setAnalysisResults] =
  useState({})
  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const jobsData = await getJobs()

      const applicationsData =
        await getCandidateApplications(userId)

      const resumesData =
        await getResumesByCandidate(userId)
      
      const interviewsData =
      await getInterviewsByCandidate(userId)
      setJobs(jobsData || [])
      setApplications(applicationsData || [])
      setResumes(resumesData || [])
      setInterviews(interviewsData || [])
    } catch (error) {
      setError(error.message || 'Failed to load dashboard')
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
  
  // ==================== JOB HELPERS ====================

  const getApplicationForJob = (jobId) => {
    return applications.find(
      (application) =>
        application.jobId === jobId
    )
  }

  // ==================== APPLY ====================

  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId)
      setError('')

      /*
       * Use the first available resume.
       * If the candidate has no resume,
       * resumeId will be null.
       */

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
      setError(error.message || 'Failed to apply')
    } finally {
      setApplyingJobId(null)
    }
  }

  // ==================== RESET RESUME FORM ====================

  const resetResumeForm = () => {
    setResumeFileName('')
    setResumeFile(null)
    setResumeSummary('')
    setResumeSkills('')
    setEditingResumeId(null)
    setShowResumeForm(false)
  }

  // ==================== CREATE RESUME ====================

  const handleCreateResume = () => {
    setEditingResumeId(null)

    setResumeFileName('')
    setResumeFile(null)
    setResumeSummary('')
    setResumeSkills('')

    setShowResumeForm(true)
  }

  // ==================== EDIT RESUME ====================

  const handleEditResume = (resume) => {
    setEditingResumeId(resume.id)

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

  // ==================== SAVE RESUME ====================

 const handleSaveResume = async (event) => {
  event.preventDefault()

  try {
    setSavingResume(true)
    setError('')

    // ============================
    // CREATE NEW RESUME
    // ============================

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

      // ============================
      // EDIT EXISTING RESUME
      // ============================

      const resumeData = {
        fileName: resumeFileName,

        summary: resumeSummary,

        skills: resumeSkills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      }

      await updateResume(
        editingResumeId,
        resumeData
      )

      /*
       * File replacement is NOT handled here yet.
       *
       * For now:
       * - Edit updates filename, summary and skills
       * - New resume upload handles the PDF
       */
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
   
  // ==================== DELETE RESUME ====================

  const handleDeleteResume = async (resume) => {
    const confirmed = window.confirm(
      `Delete "${resume.fileName}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await deleteResume(resume.id)

      await loadDashboard()

    } catch (error) {
      setError(
        error.message ||
        'Failed to delete resume'
      )
    }
  }

  // ==================== VIEW RESUME ====================

  const handleViewResume = (resume) => {
    if (!resume.fileUrl) {
      setError('Resume file is not available')
      return
    }

    /*
     * Backend returns something like:
     *
     * /uploads/resumes/abc.pdf
     *
     * Since React runs on port 5173 and Spring Boot
     * runs on port 8080, we must point the browser
     * to the backend.
     */

    const backendUrl = 'http://localhost:8080'

    const resumeUrl = resume.fileUrl.startsWith('http')
      ? resume.fileUrl
      : `${backendUrl}${resume.fileUrl}`

    window.open(
      resumeUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // ==================== LOGOUT ====================

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // ==================== FILTER JOBS ====================

  const filteredJobs = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase()

    if (!query) {
      return jobs
    }

    return jobs.filter((job) =>
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
  const handleAnalyzeResume = async (resume) => {
  try {
    setAnalyzingResumeId(resume.id)
    setError('')

    const result =
      await analyzeResume(resume.id)

    setAnalysisResults((previous) => ({
      ...previous,
      [resume.id]: result,
    }))
  } catch (error) {
    setError(
      error.message ||
      'Failed to analyze resume'
    )
  } finally {
    setAnalyzingResumeId(null)
  }
}
const handleMatchResumeToJob = async (
  resume,
  jobId
) => {
  if (!jobId) {
    setError('Please select a job')
    return
  }

  try {
    setMatchingResumeId(resume.id)
    setError('')

    const result =
      await matchResumeToJob(
        resume.id,
        jobId
      )

    setJobMatchResults((previous) => ({
  ...previous,
  [resume.id]: {
    ...(previous[resume.id] || {}),
    [jobId]: result,
  },
}))
  } catch (error) {
    setError(
      error.message ||
      'Failed to match resume to job'
    )
  } finally {
    setMatchingResumeId(null)
  }
}

  // ==================== STATUS STYLES ====================

  const getStatusStyles = (status) => {
    switch (status) {
      case 'SHORTLISTED':
        return 'border-green-500/20 bg-green-500/10 text-green-400'

      case 'REJECTED':
        return 'border-red-500/20 bg-red-500/10 text-red-400'

      case 'APPLIED':
        return 'border-blue-500/20 bg-blue-500/10 text-blue-400'

      default:
        return 'border-slate-700 bg-slate-800 text-slate-300'
    }
  }

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-slate-400">
            Loading your dashboard...
          </p>

        </div>

      </div>
    )
  }

  // ==================== UI ====================

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
              Candidate Portal
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
                Candidate Dashboard
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome, {name} 👋
              </h2>

              <p className="mt-3 max-w-2xl text-slate-400">
                Discover opportunities, manage your resume,
                and track your applications from one place.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">

                <p className="text-2xl font-bold">
                  {jobs.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Open Jobs
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">

                <p className="text-2xl font-bold">
                  {applications.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Applications
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

        {/* ================= RESUME ================= */}

        <section className="mt-10">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium text-blue-400">
                Your Profile
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                My Resume
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Upload your PDF resume and keep your profile updated.
              </p>

            </div>

            {!showResumeForm && (
              <Button onClick={handleCreateResume}>
                + Add Resume
              </Button>
            )}

          </div>

          {/* ================= RESUME FORM ================= */}

          {showResumeForm && (

            <form
              onSubmit={handleSaveResume}
              className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >

              <div>

                <p className="text-sm font-medium text-blue-400">
                  {editingResumeId
                    ? 'Edit Resume'
                    : 'New Resume'}
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {editingResumeId
                    ? 'Update your resume'
                    : 'Add your resume'}
                </h3>

              </div>

              {/* FILE */}

              <div className="mt-6">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Resume PDF
                </label>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(event) => {
                    const file =
                      event.target.files?.[0] || null

                    setResumeFile(file)

                    if (file) {
                      setResumeFileName(file.name)
                    }
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-500"
                />

                {resumeFile && (
                  <p className="mt-2 text-sm text-green-400">
                    Selected: {resumeFile.name}
                  </p>
                )}

                {editingResumeId &&
                  !resumeFile &&
                  resumeFileName && (
                    <p className="mt-2 text-sm text-slate-500">
                      Current file: {resumeFileName}
                    </p>
                  )}

              </div>

              {/* SUMMARY */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Professional Summary
                </label>

                <textarea
                  rows="4"
                  placeholder="Briefly describe your experience, background, and career goals..."
                  value={resumeSummary}
                  onChange={(event) =>
                    setResumeSummary(
                      event.target.value
                    )
                  }
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>

              {/* SKILLS */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Skills
                </label>

                <input
                  type="text"
                  placeholder="Java, Spring Boot, React, MongoDB"
                  value={resumeSkills}
                  onChange={(event) =>
                    setResumeSkills(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Separate skills with commas.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-wrap gap-3">

                <Button
                  type="submit"
                  disabled={savingResume}
                >
                  {savingResume
                    ? 'Saving...'
                    : editingResumeId
                      ? 'Save Changes'
                      : 'Save Resume'}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={resetResumeForm}
                  disabled={savingResume}
                >
                  Cancel
                </Button>

              </div>

            </form>
          )}

          {/* ================= RESUME CARDS ================= */}

          {!showResumeForm && (

            <div className="mt-6 space-y-4">

              {resumes.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">

                  <div className="text-4xl">
                    📄
                  </div>

                  <h3 className="mt-4 font-semibold">
                    No resume added yet
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Upload your PDF resume so recruiters
                    can review your profile.
                  </p>

                </div>

              ) : (

                resumes.map((resume) => (

                  <div
                    key={resume.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      <div className="flex gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                          📄
                        </div>

                        <div className="min-w-0">

                          <h3 className="break-all text-lg font-semibold">
                            {resume.fileName}
                          </h3>

                          {/* SUMMARY */}

                          {resume.summary && (
                            <div className="mt-3">

                              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Summary
                              </p>

                              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
                                {resume.summary}
                              </p>

                            </div>
                          )}

                          {/* SKILLS */}

                          {Array.isArray(resume.skills) &&
                            resume.skills.length > 0 && (

                            <div className="mt-4">

                              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                                Skills
                              </p>

                              <div className="flex flex-wrap gap-2">

                                {resume.skills.map(
                                  (skill, index) => (

                                    <span
                                      key={`${skill}-${index}`}
                                      className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
                                    >
                                      {skill}
                                    </span>

                                  )
                                )}

                              </div>

                            </div>
                          )}

                          {/* VIEW RESUME */}

                          {resume.fileUrl && (

                            <button
                              type="button"
                              onClick={() =>
                                handleViewResume(
                                  resume
                                )
                              }
                              className="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
                            >
                              View Resume →
                            </button>

                          )}
<button type="button"
  onClick={() =>
    handleAnalyzeResume(resume)
  }
  disabled={
    analyzingResumeId === resume.id
  }
  className="mt-4 ml-3 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
>
  {analyzingResumeId === resume.id
    ? 'Analyzing...'
    : 'Analyze Resume'}
</button>
<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">

  <select
    value={
      selectedJobForMatch[resume.id] || ''
    }
    onChange={(event) =>
      setSelectedJobForMatch((previous) => ({
        ...previous,
        [resume.id]: event.target.value,
      }))
    }
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:max-w-md"
  >
    <option value="">
      Select a job to match
    </option>

    {jobs.map((job) => (
      <option
        key={job.id}
        value={job.id}
      >
        {job.title}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={() =>
      handleMatchResumeToJob(
        resume,
        selectedJobForMatch[resume.id]
      )
    }
    disabled={
      matchingResumeId === resume.id ||
      !selectedJobForMatch[resume.id]
    }
    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {matchingResumeId === resume.id
      ? 'Matching...'
      : 'Match with Job'}
  </button>

</div>
{analysisResults[resume.id] && (

  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          ATS Analysis
        </p>

        <p className="mt-1 text-sm font-semibold">
          Resume Analysis Complete
        </p>
      </div>

      <div className="rounded-full bg-blue-500/10 px-4 py-2 text-lg font-bold text-blue-400">
        {Math.round(
          analysisResults[resume.id]?.matchScore || 0
        )}%
      </div>

    </div>

    {analysisResults[resume.id]?.summary && (

      <div className="mt-4">

        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Summary
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {analysisResults[resume.id].summary}
        </p>

      </div>

    )}

    {analysisResults[resume.id]?.skills?.length > 0 && (

      <div className="mt-4">

        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Detected Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {analysisResults[resume.id].skills.map(
            (skill, index) => (

              <span
                key={`${skill}-${index}`}
                className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
              >
                {skill}
              </span>

            )
          )}

        </div>

      </div>

    )}

  </div>

)}

{jobMatchResults[resume.id] &&
  Object.entries(jobMatchResults[resume.id]).map(
    ([jobId, result]) => (
      <div
        key={jobId}
        className="mt-5 rounded-2xl border border-emerald-500/20 bg-slate-950 p-5"
      >

        {/* ================= JOB MATCH HEADER ================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              AI Job Match
            </p>

            <p className="mt-1 text-sm font-semibold">
              Resume vs Job Analysis
            </p>

            {result.jobTitle && (
              <p className="mt-1 text-xs text-slate-500">
                {result.jobTitle}
              </p>
            )}

          </div>

          <div className="rounded-full bg-emerald-500/10 px-5 py-2 text-xl font-bold text-emerald-400">
            {Math.round(result.matchScore || 0)}%
          </div>

        </div>

        {/* ================= MATCHED SKILLS ================= */}

        {result.matchedSkills?.length > 0 && (

          <div className="mt-6">

            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Matched Skills
            </p>

            <div className="flex flex-wrap gap-2">

              {result.matchedSkills.map(
                (skill, index) => (

                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        )}

        {/* ================= MISSING SKILLS ================= */}

        {result.missingSkills?.length > 0 && (

          <div className="mt-6">

            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Missing Skills
            </p>

            <div className="flex flex-wrap gap-2">

              {result.missingSkills.map(
                (skill, index) => (

                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        )}

        {/* ================= MATCHING STRENGTHS ================= */}

        {result.matchingStrengths?.length > 0 && (

          <div className="mt-6">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Matching Strengths
            </p>

            <div className="mt-3 space-y-2">

              {result.matchingStrengths.map(
                (strength, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
                  >
                    <p className="text-sm leading-6 text-slate-300">
                      {strength}
                    </p>
                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* ================= GAPS ================= */}

        {result.gaps?.length > 0 && (

          <div className="mt-6">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Skill & Experience Gaps
            </p>

            <div className="mt-3 space-y-2">

              {result.gaps.map(
                (gap, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
                  >
                    <p className="text-sm leading-6 text-slate-300">
                      {gap}
                    </p>
                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* ================= EXPLANATION ================= */}

        {result.explanation && (

          <div className="mt-6">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              AI Analysis
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              {result.explanation}
            </p>

          </div>

        )}

        {/* ================= RECOMMENDATION ================= */}

        {result.recommendation && (

          <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
              Recommendation
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {result.recommendation}
            </p>

          </div>

        )}

      </div>
    )
  )}
                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex shrink-0 gap-2">

                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleEditResume(
                              resume
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleDeleteResume(
                              resume
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>
          )}

        </section>

        {/* ================= JOBS ================= */}

        <section className="mt-12">

          <div>

            <p className="text-sm font-medium text-blue-400">
              Opportunities
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Available Jobs
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Find your next opportunity.
            </p>

          </div>

          {/* SEARCH */}

          <div className="mt-6">

            <input
              type="text"
              placeholder="Search jobs by title, location, type..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-5 py-3.5 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

          {/* JOB CARDS */}

          <div className="mt-6 grid gap-5 lg:grid-cols-2">

            {filteredJobs.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center lg:col-span-2">

                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-4 font-semibold">
                  No jobs found
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Try changing your search or check back later.
                </p>

              </div>

            ) : (

              filteredJobs.map((job) => {

                const application =
                  getApplicationForJob(job.id)

                const applied =
                  Boolean(application)

                const isApplying =
                  applyingJobId === job.id

                return (

                  <article
                    key={job.id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                        💼
                      </div>

                      {job.status && (

                        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                          {job.status}
                        </span>

                      )}

                    </div>

                    <h3 className="mt-5 text-xl font-semibold group-hover:text-blue-400">
                      {job.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                      {job.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                        📍 {job.location}
                      </span>

                      <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                        💼 {job.employmentType}
                      </span>

                    </div>

                    <div className="mt-6 border-t border-slate-800 pt-5">

                      {applied ? (

                        <div className="flex items-center justify-between">

                          <span className="text-sm text-slate-400">
                            Application status
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyles(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>

                        </div>

                      ) : (

                        <Button
                          onClick={() =>
                            handleApply(job.id)
                          }
                          disabled={isApplying}
                          className="w-full"
                        >
                          {isApplying
                            ? 'Applying...'
                            : 'Apply Now'}
                        </Button>

                      )}

                    </div>

                  </article>
                )
              })
            )}

          </div>

        </section>

        {/* ================= APPLICATIONS ================= */}

        <section className="mt-12">

          <div>

            <p className="text-sm font-medium text-blue-400">
              Your Activity
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              My Applications
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Track the progress of your applications.
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
                  Apply to a job above and your application
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                {applications.map(
                  (application, index) => {

                    const job = jobs.find(
                      (item) =>
                        item.id ===
                        application.jobId
                    )

                    return (

                      <div
                        key={application.id}
                        className={`p-5 ${
                          index !==
                          applications.length - 1
                            ? 'border-b border-slate-800'
                            : ''
                        }`}
                      >

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-start gap-4">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                              📋
                            </div>

                            <div>

                              <h3 className="font-semibold">
                                {job?.title ||
                                  'Job Application'}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                Application ID:{' '}
                                {application.id}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`w-fit rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyles(
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

      </main>
{/* ==================== INTERVIEWS ==================== */}

<section className="mt-12">

  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

    <div>
      <p className="text-sm font-medium text-blue-400">
        Interview Management
      </p>

      <h2 className="mt-1 text-2xl font-bold">
        My Interviews
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        View your scheduled interviews and meeting details.
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
          Your scheduled interviews will appear here.
        </p>

      </div>

    ) : (

      <div className="grid gap-5">

        {interviews.map((interview) => {

          const statusStyles =
            interview.status === 'SCHEDULED'
              ? 'border-blue-500/20 bg-blue-500/10 text-blue-400'
              : interview.status === 'COMPLETED'
                ? 'border-green-500/20 bg-green-500/10 text-green-400'
                : 'border-red-500/20 bg-red-500/10 text-red-400'

          return (

            <div
              key={interview.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
            >

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
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles}`}
                      >
                        {interview.status}
                      </span>

                    </div>

                    <div className="mt-4 space-y-2 text-sm">

                      <p className="text-slate-300">
                        🕐 Date & Time:{' '}
                        <span className="text-slate-400">
                          {new Date(
                            interview.scheduledAt
                          ).toLocaleString()}
                        </span>
                      </p>

                      <p className="text-slate-300">
                        📋 Application ID:{' '}
                        <span className="text-slate-400">
                          {interview.applicationId}
                        </span>
                      </p>

                      {interview.meetingLink && (
                        <p>
                          🔗{' '}

                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-blue-400 hover:text-blue-300"
                          >
                            Join Interview
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

                {interview.status === 'SCHEDULED' &&
                  interview.meetingLink && (
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                      Join Meeting →
                    </a>
                  )}

              </div>

            </div>

          )
        })}

      </div>

    )}

  </div>

</section>
      {/* ================= FOOTER ================= */}

      <footer className="mt-16 border-t border-slate-800">

        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6">
          © {new Date().getFullYear()} TalentFlow. All rights reserved.
        </div>

      </footer>

    </div>
  )
}

export default CandidateDashboard
