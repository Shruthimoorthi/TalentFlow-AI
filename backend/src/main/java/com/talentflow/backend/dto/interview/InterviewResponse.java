package com.talentflow.backend.dto.interview;

import java.time.LocalDateTime;

public class InterviewResponse {

    private String id;
    private String applicationId;
    private String recruiterId;
    private String candidateId;
    private LocalDateTime scheduledAt;
    private String meetingLink;
    private String status;
    private String notes;

    public InterviewResponse() {
    }

    public InterviewResponse(String id, String applicationId,
            String recruiterId, String candidateId,
            LocalDateTime scheduledAt,
            String meetingLink, String status,
            String notes) {
        this.id = id;
        this.applicationId = applicationId;
        this.recruiterId = recruiterId;
        this.candidateId = candidateId;
        this.scheduledAt = scheduledAt;
        this.meetingLink = meetingLink;
        this.status = status;
        this.notes = notes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}