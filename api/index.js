import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Security Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

// POST route for sending email
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic Input Validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email from .env
      pass: process.env.EMAIL_PASS, // Your email password or app password from .env
    },
  });

  // Set up email data
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECIPIENT_EMAIL, // The recipient email from .env
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from your website's contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p> 
    `,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .send({ success: false, message: "Failed to send message." });
    }
    console.log("Email sent: " + info.response);
    res
      .status(200)
      .send({ success: true, message: "Message sent successfully!" });
  });
});

export default app;
