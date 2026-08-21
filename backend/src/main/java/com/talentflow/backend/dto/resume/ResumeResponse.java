package com.talentflow.backend.dto.resume;

import java.time.LocalDateTime;
import java.util.List;

public class ResumeResponse {

    private String id;
    private String candidateId;
    private String fileName;
    private String fileUrl;
    private String summary;
    private List<String> skills;
    private LocalDateTime uploadedAt;

    public ResumeResponse() {
    }

    public ResumeResponse(String id, String candidateId,
            String fileName, String fileUrl,
            String summary, List<String> skills,
            LocalDateTime uploadedAt) {
        this.id = id;
        this.candidateId = candidateId;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.summary = summary;
        this.skills = skills;
        this.uploadedAt = uploadedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}