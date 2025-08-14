const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: "./files",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

// Upload and send email
app.post("/send-email", upload.single("attachment"), async (req, res) => {
  const { email, message } = req.body;
  const filePath = req.file.path;

  // Setup Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhildeveloper2025@gmail.com",
      pass: "jivc mqlc snro llij",
    },
  });

  const mailOptions = {
    from: "nikhildeveloper2025@gmail.com",
    to: email,
    subject: "Here is your attachment",
    text: message,
    attachments: [
      {
        filename: req.file.originalname,
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
