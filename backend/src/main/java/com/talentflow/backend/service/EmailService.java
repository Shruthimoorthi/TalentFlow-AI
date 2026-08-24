package com.talentflow.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

        private final ObjectMapper objectMapper = new ObjectMapper();

        private final HttpClient httpClient = HttpClient.newHttpClient();

        @Value("${brevo.api-key}")
        private String brevoApiKey;

        @Value("${brevo.sender-email}")
        private String senderEmail;

        @Value("${brevo.sender-name}")
        private String senderName;

        public EmailService() {
        }

        // ==================== SEND EMAIL ====================

        public void sendEmail(
                        String to,
                        String subject,
                        String message) {

                if (brevoApiKey == null ||
                                brevoApiKey.isBlank()) {

                        throw new RuntimeException(
                                        "BREVO_API_KEY is not configured");
                }

                if (senderEmail == null ||
                                senderEmail.isBlank()) {

                        throw new RuntimeException(
                                        "BREVO_SENDER_EMAIL is not configured");
                }

                if (senderName == null ||
                                senderName.isBlank()) {

                        senderName = "TalentFlow";
                }

                try {

                        Map<String, Object> payload = Map.of(
                                        "sender", Map.of(
                                                        "name", senderName,
                                                        "email", senderEmail),

                                        "to", List.of(
                                                        Map.of(
                                                                        "email", to)),

                                        "subject", subject,

                                        "textContent", message);

                        String jsonBody = objectMapper.writeValueAsString(payload);

                        HttpRequest request = HttpRequest.newBuilder()
                                        .uri(
                                                        URI.create(
                                                                        "https://api.brevo.com/v3/smtp/email"))
                                        .header(
                                                        "accept",
                                                        "application/json")
                                        .header(
                                                        "api-key",
                                                        brevoApiKey)
                                        .header(
                                                        "content-type",
                                                        "application/json")
                                        .POST(
                                                        HttpRequest.BodyPublishers
                                                                        .ofString(jsonBody))
                                        .build();

                        HttpResponse<String> response = httpClient.send(
                                        request,
                                        HttpResponse.BodyHandlers
                                                        .ofString());

                        if (response.statusCode() < 200 ||
                                        response.statusCode() >= 300) {

                                throw new RuntimeException(
                                                "Brevo email failed. HTTP "
                                                                + response.statusCode()
                                                                + ": "
                                                                + response.body());
                        }

                } catch (InterruptedException e) {

                        Thread.currentThread().interrupt();

                        throw new RuntimeException(
                                        "Email sending was interrupted",
                                        e);

                } catch (IOException e) {

                        throw new RuntimeException(
                                        "Failed to send email through Brevo",
                                        e);
                }
        }

        // ==================== APPLICATION CONFIRMATION ====================

        public void sendApplicationConfirmation(
                        String email,
                        String jobTitle) {

                sendEmail(
                                email,
                                "TalentFlow - Application Submitted",
                                """
                                                Your application has been submitted successfully.

                                                Job: %s

                                                Thank you for applying through TalentFlow.

                                                Regards,
                                                TalentFlow
                                                """.formatted(jobTitle));
        }

        // ==================== INTERVIEW NOTIFICATION ====================

        public void sendInterviewNotification(
                        String email,
                        String jobTitle,
                        String scheduledAt,
                        String meetingLink) {

                String message = """
                                Hello,

                                Your interview has been scheduled through TalentFlow.

                                Job: %s
                                Interview Date & Time: %s

                                Meeting Link:
                                %s

                                Please join a few minutes early.

                                Good luck!

                                Regards,
                                TalentFlow
                                """.formatted(
                                jobTitle,
                                scheduledAt,
                                meetingLink);

                sendEmail(
                                email,
                                "TalentFlow - Interview Scheduled",
                                message);
        }
}