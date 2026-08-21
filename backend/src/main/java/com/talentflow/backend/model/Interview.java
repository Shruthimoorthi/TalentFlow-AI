package com.talentflow.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "interviews")
public class Interview {

    @Id
    private String id;

    private String applicationId;
    private String recruiterId;
    private String candidateId;
    private LocalDateTime scheduledAt;
    private String meetingLink;
    private String status;
    private String notes;

    public Interview() {
    }

    public Interview(String applicationId, String recruiterId,
            String candidateId, LocalDateTime scheduledAt,
            String meetingLink) {
        this.applicationId = applicationId;
        this.recruiterId = recruiterId;
        this.candidateId = candidateId;
        this.scheduledAt = scheduledAt;
        this.meetingLink = meetingLink;
        this.status = "SCHEDULED";
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