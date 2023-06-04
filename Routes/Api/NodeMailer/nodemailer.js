const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "project.kaamlay@gmail.com",
    pass: "gulgrs3569",
  },
});
const mailOptions = {
  from: "project.kaamlay@gmail.com",
  to: "soomrogulrehman24@gmail.com",
  subject: "Hello from Node.js",
  text: "This is a plain text email",
  html: "<h1>This is an HTML email</h1>",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error occurred:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});

module.exports = transporter;
