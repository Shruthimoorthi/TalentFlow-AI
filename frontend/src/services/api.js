const API_BASE_URL = 'http://localhost:8080/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    )
  }

  return data
}

// ==================== AUTH ====================

export async function loginUser(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function registerUser(name, email, password, role) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
      role: role.toUpperCase(),
    }),
  })
}

// ==================== JOBS ====================

export async function getJobs() {
  return request('/jobs')
}

export async function createJob(job) {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
  })
}

export async function updateJob(jobId, job) {
  return request(`/jobs/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(job),
  })
}

export async function deleteJob(jobId) {
  return request(`/jobs/${jobId}`, {
    method: 'DELETE',
  })
}

// ==================== APPLICATIONS ====================

export async function getApplications() {
  return request('/applications')
}

export async function getCandidateApplications(candidateId) {
  return request(`/applications/candidate/${candidateId}`)
}

export async function getJobApplications(jobId) {
  return request(`/applications/job/${jobId}`)
}

export async function applyForJob(
  jobId,
  candidateId,
  resumeId = null
) {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify({
      jobId,
      candidateId,
      resumeId,
    }),
  })
}

export async function updateApplicationStatus(
  applicationId,
  status
) {
  return request(`/applications/${applicationId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
    }),
  })
}

// ==================== RESUMES ====================

export async function getResumesByCandidate(candidateId) {
  return request(`/resumes/candidate/${candidateId}`)
}

export async function createResume(
  candidateId,
  file,
  summary,
  skills
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  formData.append(
    'candidateId',
    candidateId
  )

  formData.append(
    'file',
    file
  )

  formData.append(
    'summary',
    summary || ''
  )

  formData.append(
    'skills',
    skills || ''
  )

  const response = await fetch(
    'http://localhost:8080/api/resumes',
    {
      method: 'POST',

      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},

      body: formData,
    }
  )

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Resume upload failed with status ${response.status}`
    )
  }

  return data
}
export async function updateResume(id, resume) {
  return request(`/resumes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resume),
  })
}

export async function deleteResume(id) {
  return request(`/resumes/${id}`, {
    method: 'DELETE',
  })
}
export async function uploadResumeFile(
  candidateId,
  file,
  summary = '',
  skills = ''
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  formData.append(
    'candidateId',
    candidateId
  )

  formData.append(
    'file',
    file
  )

  formData.append(
    'summary',
    summary
  )

  formData.append(
    'skills',
    skills
  )

  const response = await fetch(
    'http://localhost:8080/api/resumes',
    {
      method: 'POST',

      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},

      body: formData,
    }
  )

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Resume upload failed with status ${response.status}`
    )
  }

  return data
}
// ==================== INTERVIEWS ====================

export async function createInterview(interview) {
  return request('/interviews', {
    method: 'POST',
    body: JSON.stringify(interview),
  })
}

export async function getInterviews() {
  return request('/interviews')
}

export async function getInterviewById(interviewId) {
  return request(`/interviews/${interviewId}`)
}

export async function getInterviewsByCandidate(candidateId) {
  return request(`/interviews/candidate/${candidateId}`)
}

export async function getInterviewsByRecruiter(recruiterId) {
  return request(`/interviews/recruiter/${recruiterId}`)
}

export async function getInterviewsByApplication(applicationId) {
  return request(`/interviews/application/${applicationId}`)
}

export async function updateInterview(interviewId, interview) {
  return request(`/interviews/${interviewId}`, {
    method: 'PUT',
    body: JSON.stringify(interview),
  })
}

export async function deleteInterview(interviewId) {
  return request(`/interviews/${interviewId}`, {
    method: 'DELETE',
  })
}
 // ==================== ATS / AI MATCHING ====================

export async function analyzeResume(resumeId) {
  return request(`/ai/analyze-resume/${resumeId}`, {
    method: 'POST',
  })
}

export async function matchResumeToJob(
  resumeId,
  jobId
) {
  return request(
    `/ai/match-resume/${resumeId}/${jobId}`,
    {
      method: 'POST',
    }
  )
}


// ==================== LOGOUT ====================

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('role')
}