package com.talentflow.backend.dto.interview;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateInterviewRequest {

    @NotBlank(message = "Application ID is required")
    private String applicationId;

    @NotBlank(message = "Recruiter ID is required")
    private String recruiterId;

    @NotBlank(message = "Candidate ID is required")
    private String candidateId;

    @NotNull(message = "Scheduled time is required")
    private LocalDateTime scheduledAt;

    private String meetingLink;

    public CreateInterviewRequest() {
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(String recruiterId) {
        this.recruiterId = recruiterId;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }
}