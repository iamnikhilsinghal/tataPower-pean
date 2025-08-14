const express = require("express"); //used to create server-side applications.
const nodemailer = require("nodemailer"); //a module to send emails.
const bodyParser = require("body-parser");
const app = express();

// Middleware to parse incoming request bodies (specifically for form data).
app.use(bodyParser.urlencoded({ extended: true }));

// set up transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "", // the email you used to create app password
    pass: "", // your generated app password
  },
});

// Route to handle form submission
app.post("/send", (req, res) => {
  const { from, subject, message } = req.body;

  // Constructing the message with the sender's email included
  const fullMessage = `Sender's Email: ${from}\nSubject: ${subject}\n\nMessage:\n${message}`;

  console.log("full", fullMessage);

  const mailOptions = {
    from: from, // the email captured from the form
    to: "nikhilsinghal000@gmail.com", // the email you want to receive emails
    subject: subject, // the subject captured
    text: fullMessage, // the message captured
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: ", info.response);
      res.send("Email sent successfully");
    }
  });
});

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
//you can. choose any port you want really.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
