package com.talentflow.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

        private final JavaMailSender mailSender;

        public EmailService(JavaMailSender mailSender) {
                this.mailSender = mailSender;
        }

        public void sendEmail(
                        String to,
                        String subject,
                        String message) {

                SimpleMailMessage mailMessage = new SimpleMailMessage();

                mailMessage.setFrom(
                                System.getenv("MAIL_USERNAME"));

                mailMessage.setTo(to);
                mailMessage.setSubject(subject);
                mailMessage.setText(message);

                mailSender.send(mailMessage);
        }

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