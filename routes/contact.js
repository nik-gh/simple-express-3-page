const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_login@gmail.com',
      pass: 'your_password',
    },
  });

  const mailOptions = {
    from: 'John Doe <johndoe@outlook.com>',
    to: 'someMail@gmail.com',
    subject: 'Website Submission',
    text: `You have a new submission with the following details...Name ${req.body.name} Email ${req.body.email} Message ${req.body.message}`,
    html: `<p>You got a new submission with the following details</p><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log(`message Sent: ${info.response}`);
      res.redirect('/');
    }
  });
});

module.exports = router;
