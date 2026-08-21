package com.talentflow.backend.dto.application;

import jakarta.validation.constraints.NotBlank;

public class ApplyJobRequest {

    @NotBlank(message = "Job ID is required")
    private String jobId;

    @NotBlank(message = "Candidate ID is required")
    private String candidateId;

    private String resumeId;

    public ApplyJobRequest() {
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getResumeId() {
        return resumeId;
    }

    public void setResumeId(String resumeId) {
        this.resumeId = resumeId;
    }
}