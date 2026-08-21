package com.talentflow.backend.dto.resume;

import java.util.List;

public class ResumeAnalysisResponse {

    private String resumeId;
    private String summary;
    private List<String> skills;
    private double matchScore;

    public ResumeAnalysisResponse() {
    }

    public ResumeAnalysisResponse(String resumeId, String summary,
            List<String> skills,
            double matchScore) {
        this.resumeId = resumeId;
        this.summary = summary;
        this.skills = skills;
        this.matchScore = matchScore;
    }

    public String getResumeId() {
        return resumeId;
    }

    public void setResumeId(String resumeId) {
        this.resumeId = resumeId;
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

    public double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }
}