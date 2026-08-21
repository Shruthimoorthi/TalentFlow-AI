package com.talentflow.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendEmail(
            String to,
            String subject,
            String message) {

        logger.info(
                "Email requested: to={}, subject={}",
                to,
                subject);

        logger.info(
                "Email content: {}",
                message);
    }

    public void sendApplicationConfirmation(
            String email,
            String jobTitle) {

        sendEmail(
                email,
                "Application Submitted",
                "Your application for " +
                        jobTitle +
                        " has been submitted successfully.");
    }

    public void sendInterviewNotification(
            String email,
            String jobTitle) {

        sendEmail(
                email,
                "Interview Scheduled",
                "Your interview for " +
                        jobTitle +
                        " has been scheduled.");
    }
}