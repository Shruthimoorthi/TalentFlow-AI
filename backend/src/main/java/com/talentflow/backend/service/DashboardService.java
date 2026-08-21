package com.talentflow.backend.service;

import com.talentflow.backend.repository.ApplicationRepository;
import com.talentflow.backend.repository.InterviewRepository;
import com.talentflow.backend.repository.JobRepository;
import com.talentflow.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;

    public DashboardService(
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository,
            InterviewRepository interviewRepository) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.interviewRepository = interviewRepository;
    }

    public Map<String, Object> getDashboardSummary() {

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put(
                "totalUsers",
                userRepository.count());

        dashboard.put(
                "totalJobs",
                jobRepository.count());

        dashboard.put(
                "totalApplications",
                applicationRepository.count());

        dashboard.put(
                "totalInterviews",
                interviewRepository.count());

        return dashboard;
    }
}