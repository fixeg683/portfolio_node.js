const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST route to handle form submission
router.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.RECIPIENT_EMAIL, // Your receiving email address
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new submission from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
            <p>You have a new submission from your portfolio contact form.</p>
            <h3>Contact Details</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
            </ul>
            <p><strong>Message:</strong> ${message}</p>
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ msg: 'Failed to send email.' });
        }
        res.status(200).json({ msg: 'Email sent successfully!' });
    });
});

module.exports = router;
