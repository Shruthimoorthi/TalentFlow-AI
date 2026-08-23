package com.talentflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Application;
import com.talentflow.backend.model.Interview;
import com.talentflow.backend.model.Job;
import com.talentflow.backend.model.User;
import com.talentflow.backend.repository.InterviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final EmailService emailService;
    private final UserService userService;
    private final JobService jobService;
    private final ApplicationService applicationService;

    public InterviewService(
            InterviewRepository interviewRepository,
            EmailService emailService,
            UserService userService,
            JobService jobService,
            ApplicationService applicationService) {

        this.interviewRepository = interviewRepository;
        this.emailService = emailService;
        this.userService = userService;
        this.jobService = jobService;
        this.applicationService = applicationService;
    }

    public Interview createInterview(Interview interview) {

        if (interview.getStatus() == null ||
                interview.getStatus().isBlank()) {

            interview.setStatus("SCHEDULED");
        }

        // Save interview first
        Interview savedInterview = interviewRepository.save(interview);

        // Get candidate
        User candidate = userService.getUserById(
                interview.getCandidateId())
                .orElseThrow(() -> new RuntimeException(
                        "Candidate not found with id: "
                                + interview.getCandidateId()));

        // Get job through application
        Application application = applicationService.getApplicationById(
                interview.getApplicationId());

        Job job = jobService.getJobById(
                application.getJobId());

        // Send email after successful save
        emailService.sendInterviewNotification(
                candidate.getEmail(),
                job.getTitle(),
                interview.getScheduledAt().toString(),
                interview.getMeetingLink());

        return savedInterview;
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