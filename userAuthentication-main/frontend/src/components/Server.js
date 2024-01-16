const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Choose an appropriate port

app.use(bodyParser.json());

// Endpoint to send a verification email
app.post('/send-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    // Send the verification code to the provided email
    await sendVerificationCodeToEmail(email, code);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send verification code' });
  }
});

// Helper function to send verification code to the email
const sendVerificationCodeToEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail email address
      pass: 'your-email-password', // Your Gmail email password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Your Gmail email address
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve();
      }
    });
  });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
