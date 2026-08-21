package com.talentflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Application;
import com.talentflow.backend.repository.ApplicationRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application applyForJob(Application application) {

        boolean alreadyApplied = applicationRepository.existsByJobIdAndCandidateId(
                application.getJobId(),
                application.getCandidateId());

        if (alreadyApplied) {
            throw new RuntimeException(
                    "Candidate has already applied for this job");
        }

        if (application.getStatus() == null ||
                application.getStatus().isBlank()) {
            application.setStatus("APPLIED");
        }

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(String id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found with id: " + id));
    }

    public List<Application> getApplicationsByCandidate(
            String candidateId) {

        return applicationRepository.findByCandidateId(candidateId);
    }

    public List<Application> getApplicationsByJob(String jobId) {

        return applicationRepository.findByJobId(jobId);
    }

    public Application updateStatus(String id, String status) {

        Application application = getApplicationById(id);

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    public void deleteApplication(String id) {

        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException(
                    "Application not found with id: " + id);
        }

        applicationRepository.deleteById(id);
    }
}