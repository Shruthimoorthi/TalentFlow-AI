package com.talentflow.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiMatchingService {

    public Map<String, Object> analyzeResume(
            String resumeId) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "resumeId",
                resumeId);

        response.put(
                "status",
                "PENDING");

        response.put(
                "message",
                "Resume analysis service is ready for AI integration.");

        return response;
    }

    public Map<String, Object> matchResumeToJob(
            String resumeId,
            String jobId) {

        Map<String, Object> response = new HashMap<>();

        response.put(
                "resumeId",
                resumeId);

        response.put(
                "jobId",
                jobId);

        response.put(
                "status",
                "PENDING");

        response.put(
                "message",
                "AI matching service is ready for integration.");

        return response;
    }
}