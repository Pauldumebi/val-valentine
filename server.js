const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Email endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background: linear-gradient(135deg, #ff006e 0%, #ffbe0b 25%, #3a86ff 50%, #fb5607 75%, #8338ec 100%); border-radius: 15px; color: white;">
          <h1 style="font-size: 48px; margin-bottom: 20px;">💘 YES! 💘</h1>
          <p style="font-size: 24px; margin: 20px 0;">${message}</p>
          <p style="font-size: 18px; margin-top: 30px; opacity: 0.9;">Get ready for an amazing Valentine's Day! 🎉</p>
          <p style="font-size: 14px; margin-top: 40px; opacity: 0.7;">Sent with love ❤️</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
