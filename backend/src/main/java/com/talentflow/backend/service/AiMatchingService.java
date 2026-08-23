package com.talentflow.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Job;
import com.talentflow.backend.model.Resume;

@Service
public class AiMatchingService {

        private final ResumeService resumeService;
        private final JobService jobService;
        private final ResumeTextExtractionService resumeTextExtractionService;
        private final GeminiAiService geminiAiService;

        public AiMatchingService(
                        ResumeService resumeService,
                        JobService jobService,
                        ResumeTextExtractionService resumeTextExtractionService,
                        GeminiAiService geminiAiService) {

                this.resumeService = resumeService;
                this.jobService = jobService;
                this.resumeTextExtractionService = resumeTextExtractionService;
                this.geminiAiService = geminiAiService;
        }

        // ==================== AI RESUME ANALYSIS ====================

        public Map<String, Object> analyzeResume(
                        String resumeId) {

                Resume resume = resumeService.getResumeById(resumeId);

                String resumeText = resumeTextExtractionService.extractText(resume);

                Map<String, Object> aiResult = geminiAiService.analyzeResume(resumeText);

                Map<String, Object> response = new HashMap<>();

                response.putAll(aiResult);

                response.put("resumeId", resumeId);
                response.put(
                                "matchScore",
                                calculateAtsScore(aiResult));
                response.put("status", "COMPLETED");

                return response;
        }

        // ==================== AI JOB MATCHING ====================

        public Map<String, Object> matchResumeToJob(
                        String resumeId,
                        String jobId) {

                Resume resume = resumeService.getResumeById(resumeId);

                Job job = jobService.getJobById(jobId);

                String resumeText = resumeTextExtractionService.extractText(resume);

                Map<String, Object> aiResult = geminiAiService.matchResumeToJob(
                                resumeText,
                                job.getTitle(),
                                job.getDescription());

                Map<String, Object> response = new HashMap<>();

                response.put("resumeId", resumeId);
                response.put("jobId", jobId);
                response.put("jobTitle", job.getTitle());

                response.putAll(aiResult);

                response.put("status", "COMPLETED");

                return response;
        }

        // ==================== ATS SCORE ====================

        private double calculateAtsScore(
                        Map<String, Object> aiResult) {

                double skillsScore = getScore(aiResult, "skillsScore");

                double experienceScore = getScore(aiResult, "experienceScore");

                double projectsScore = getScore(aiResult, "projectsScore");

                double completenessScore = getScore(aiResult, "completenessScore");

                double atsReadinessScore = getScore(aiResult, "atsReadinessScore");

                double finalScore = (skillsScore * 0.30)
                                + (experienceScore * 0.20)
                                + (projectsScore * 0.20)
                                + (completenessScore * 0.15)
                                + (atsReadinessScore * 0.15);

                return Math.round(
                                Math.max(0, Math.min(100, finalScore)));
        }

        private double getScore(
                        Map<String, Object> result,
                        String key) {

                Object value = result.get(key);

                if (value instanceof Number number) {

                        return Math.max(
                                        0,
                                        Math.min(
                                                        100,
                                                        number.doubleValue()));
                }

                return 0;
        }

}