package com.talentflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Interview;
import com.talentflow.backend.repository.InterviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public InterviewService(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    public Interview createInterview(Interview interview) {

        if (interview.getStatus() == null ||
                interview.getStatus().isBlank()) {
            interview.setStatus("SCHEDULED");
        }

        return interviewRepository.save(interview);
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview getInterviewById(String id) {
        return interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Interview not found with id: " + id));
    }

    public List<Interview> getInterviewsByCandidate(
            String candidateId) {

        return interviewRepository.findByCandidateId(candidateId);
    }

    public List<Interview> getInterviewsByRecruiter(
            String recruiterId) {

        return interviewRepository.findByRecruiterId(recruiterId);
    }

    public List<Interview> getInterviewsByApplication(
            String applicationId) {

        return interviewRepository.findByApplicationId(applicationId);
    }

    public Interview updateInterview(
            String id,
            Interview updatedInterview) {

        Interview existingInterview = getInterviewById(id);

        existingInterview.setScheduledAt(
                updatedInterview.getScheduledAt());

        existingInterview.setMeetingLink(
                updatedInterview.getMeetingLink());

        if (updatedInterview.getStatus() != null) {
            existingInterview.setStatus(
                    updatedInterview.getStatus());
        }

        if (updatedInterview.getNotes() != null) {
            existingInterview.setNotes(
                    updatedInterview.getNotes());
        }

        return interviewRepository.save(existingInterview);
    }

    public void deleteInterview(String id) {

        if (!interviewRepository.existsById(id)) {
            throw new RuntimeException(
                    "Interview not found with id: " + id);
        }

        interviewRepository.deleteById(id);
    }
}