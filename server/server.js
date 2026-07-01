import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', (req, res) => {
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

  // In production, you would:
  // 1. Send an email notification (using nodemailer, etc.)
  // 2. Save to a database
  // 3. Send a confirmation email to the user

  res.json({ 
    success: true, 
    message: 'Thank you for your message! We will get back to you within 24 hours.' 
  });
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
