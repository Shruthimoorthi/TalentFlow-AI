package com.talentflow.backend.dto.application;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private String id;
    private String jobId;
    private String candidateId;
    private String resumeId;
    private String status;
    private LocalDateTime appliedAt;

    public ApplicationResponse() {
    }

    public ApplicationResponse(String id, String jobId, String candidateId,
            String resumeId, String status,
            LocalDateTime appliedAt) {
        this.id = id;
        this.jobId = jobId;
        this.candidateId = candidateId;
        this.resumeId = resumeId;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}