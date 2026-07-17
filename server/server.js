import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields.' 
    });
  }

  // Log the contact form submission
  console.log('📧 New Contact Form Submission:');
  console.log('----------------------------');
  console.log(`Name:    ${name}`);
  console.log(`Email:   ${email}`);
  console.log(`Phone:   ${phone || 'Not provided'}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('----------------------------\n');

  const receiverEmail = process.env.EMAIL_RECEIVER || 'kq.malik400@gmail.com, medinshealthcare@gmail.com';
  const senderUser = process.env.EMAIL_USER;
  const senderPass = process.env.EMAIL_PASS;

  // If email configuration is missing, log a warning and return success so frontend simulates completion
  if (!senderUser || !senderPass || senderUser.includes('your-sending-email')) {
    console.warn('⚠️ EMAIL CONFIGURATION NOT SET OR USING PLACEHOLDERS.');
    console.warn('Please update the .env file with your SMTP credentials to send actual emails.\n');
    return res.json({ 
      success: true, 
      message: 'Thank you for your message! (Simulated submission - Email credentials not set in .env)' 
    });
  }

  // Set up mail options
  const mailOptions = {
    from: `"${name} (Medins Form)" <${senderUser}>`,
    to: receiverEmail,
    replyTo: email,
    subject: `New Medins Healthcare Contact Form: ${subject}`,
    text: `New contact form submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 30%;">Full Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Subject:</td>
            <td style="padding: 8px; color: #1e40af; font-weight: bold;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #1e3a8a; border-radius: 4px;">
          <h4 style="margin: 0 0 10px 0; color: #111827;">Message:</h4>
          <p style="margin: 0; white-space: pre-wrap; color: #374151;">${message}</p>
        </div>
        <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #eee; padding-top: 10px;">
          This message was sent automatically from the Medins Healthcare contact form.
        </footer>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${receiverEmail}`);
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Could not send email. Please check server logs or contact support.' 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Medins Healthcare API' });
});

app.listen(PORT, () => {
  console.log(`\n🏥 Medins Healthcare Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});
