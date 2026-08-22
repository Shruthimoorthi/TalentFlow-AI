package com.talentflow.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Job;
import com.talentflow.backend.model.Resume;

@Service
public class AiMatchingService {

        private final ResumeService resumeService;
        private final JobService jobService;

        public AiMatchingService(
                        ResumeService resumeService,
                        JobService jobService) {

                this.resumeService = resumeService;
                this.jobService = jobService;
        }

        public Map<String, Object> analyzeResume(String resumeId) {

                Resume resume = resumeService.getResumeById(resumeId);

                Map<String, Object> response = new HashMap<>();

                response.put("resumeId", resume.getId());
                response.put("summary", resume.getSummary());
                response.put(
                                "skills",
                                resume.getSkills() != null
                                                ? resume.getSkills()
                                                : List.of());
                response.put("status", "COMPLETED");

                return response;
        }

        public Map<String, Object> matchResumeToJob(
                        String resumeId,
                        String jobId) {

                Resume resume = resumeService.getResumeById(resumeId);

                Job job = jobService.getJobById(jobId);

                List<String> resumeSkills = resume.getSkills() != null
                                ? resume.getSkills()
                                : List.of();

                String jobText = ((job.getTitle() != null
                                ? job.getTitle()
                                : "")
                                + " "
                                + (job.getDescription() != null
                                                ? job.getDescription()
                                                : ""))
                                .toLowerCase();

                int matchedCount = 0;

                for (String skill : resumeSkills) {

                        if (skill != null
                                        && !skill.isBlank()
                                        && jobText.contains(
                                                        skill.toLowerCase())) {

                                matchedCount++;
                        }
                }

                double matchScore = 0;

                if (!resumeSkills.isEmpty()) {
                        matchScore = (matchedCount * 100.0)
                                        / resumeSkills.size();
                }

                Map<String, Object> response = new HashMap<>();

                response.put("resumeId", resumeId);
                response.put("jobId", jobId);
                response.put("summary", resume.getSummary());
                response.put("skills", resumeSkills);
                response.put("matchScore", matchScore);
                response.put("status", "COMPLETED");

                return response;
        }
}