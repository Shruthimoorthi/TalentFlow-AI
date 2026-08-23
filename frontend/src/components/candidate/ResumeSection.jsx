import Button from '../Button'
import AtsAnalysisCard from './AtsAnalysisCard'
import JobMatchCard from './JobMatchCard'

function ResumeSection({
  resumes,
  jobs,
  showResumeForm,
  editingResumeId,
  resumeFileName,
  resumeFile,
  resumeSummary,
  resumeSkills,
  savingResume,
  analyzingResumeId,
  matchingResumeId,
  selectedJobForMatch,
  analysisResults,
  jobMatchResults,
  onCreateResume,
  onEditResume,
  onDeleteResume,
  onViewResume,
  onSaveResume,
  onResetResumeForm,
  onResumeFileChange,
  onResumeSummaryChange,
  onResumeSkillsChange,
  onAnalyzeResume,
  onSelectJob,
  onMatchResumeToJob,
}) {
  return (
    <section
      id="resume"
      className="scroll-mt-24 pt-16"
    >
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Profile
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            My Resume
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Upload, manage, and analyze your resume with TalentFlow AI.
          </p>
        </div>

        {!showResumeForm && (
          <Button
            onClick={onCreateResume}
            className="w-full sm:w-auto"
          >
            + Add Resume
          </Button>
        )}

      </div>

      {/* ================= FORM ================= */}

      {showResumeForm && (
        <form
          onSubmit={onSaveResume}
          className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              {editingResumeId
                ? 'Edit Resume'
                : 'New Resume'}
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {editingResumeId
                ? 'Update your resume'
                : 'Add your resume'}
            </h3>
          </div>

          {/* FILE */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={onResumeFileChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
            />

            {resumeFile && (
              <p className="mt-2 text-sm font-medium text-emerald-600">
                Selected: {resumeFile.name}
              </p>
            )}

            {editingResumeId &&
              !resumeFile &&
              resumeFileName && (
                <p className="mt-2 text-xs text-slate-500">
                  Current file: {resumeFileName}
                </p>
              )}
          </div>

          {/* SUMMARY */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Professional Summary
            </label>

            <textarea
              rows="4"
              placeholder="Briefly describe your experience, background, and career goals..."
              value={resumeSummary}
              onChange={(event) =>
                onResumeSummaryChange(
                  event.target.value
                )
              }
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* SKILLS */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Skills
            </label>

            <input
              type="text"
              placeholder="Java, Spring Boot, React, MongoDB"
              value={resumeSkills}
              onChange={(event) =>
                onResumeSkillsChange(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate skills with commas.
            </p>
          </div>

          {/* BUTTONS */}

          <div className="mt-7 flex flex-wrap gap-3">

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
              onClick={onResetResumeForm}
              disabled={savingResume}
            >
              Cancel
            </Button>

          </div>
        </form>
      )}

      {/* ================= RESUMES ================= */}

      {!showResumeForm && (
        <div className="mt-6 space-y-5">

          {resumes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                📄
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-950">
                No resume added yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Upload your PDF resume to start using AI-powered
                ATS analysis and job matching.
              </p>

              <Button
                onClick={onCreateResume}
                className="mt-5"
              >
                Upload Resume
              </Button>

            </div>
          ) : (
            resumes.map((resume) => (
              <article
                key={resume.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
              >

                {/* RESUME HEADER */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="flex min-w-0 gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                      📄
                    </div>

                    <div className="min-w-0">

                      <h3 className="break-all text-xl font-bold text-slate-950">
                        {resume.fileName}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Resume profile
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    <Button
                      variant="secondary"
                      onClick={() =>
                        onEditResume(resume)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        onDeleteResume(resume)
                      }
                    >
                      Delete
                    </Button>

                  </div>

                </div>

                {/* SUMMARY */}

                {resume.summary && (
                  <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Summary
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {resume.summary}
                    </p>

                  </div>
                )}

                {/* SKILLS */}

                {Array.isArray(resume.skills) &&
                  resume.skills.length > 0 && (
                    <div className="mt-5">

                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Skills
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {resume.skills.map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                            >
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

                {/* ACTIONS */}

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">

                  {resume.fileUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        onViewResume(resume)
                      }
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Resume
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      onAnalyzeResume(resume)
                    }
                    disabled={
                      analyzingResumeId ===
                      resume.id
                    }
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {analyzingResumeId ===
                    resume.id
                      ? 'Analyzing...'
                      : 'Analyze Resume'}
                  </button>

                </div>

                {/* ATS ANALYSIS */}

                {analysisResults[resume.id] && (
                  <AtsAnalysisCard
                    result={
                      analysisResults[resume.id]
                    }
                  />
                )}

                {/* JOB MATCH */}

                <JobMatchCard
                  resume={resume}
                  jobs={jobs}
                  selectedJobForMatch={
                    selectedJobForMatch[resume.id] ||
                    ''
                  }
                  onSelectJob={(jobId) =>
                    onSelectJob(
                      resume.id,
                      jobId
                    )
                  }
                  onMatch={() =>
                    onMatchResumeToJob(
                      resume,
                      selectedJobForMatch[
                        resume.id
                      ]
                    )
                  }
                  isMatching={
                    matchingResumeId ===
                    resume.id
                  }
                  results={
                    jobMatchResults[resume.id] || {}
                  }
                />

              </article>
            ))
          )}

        </div>
      )}
    </section>
  )
}

export default ResumeSection