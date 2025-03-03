const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server
      port: 587,
      secure: false, // Use `true` for 465, `false` for 587
      auth: {
        user: "ariyomiracle1234@gmail.com", // Your email
        pass: "bius czkl vvfe bghm", // App password (Never use a real password)
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "emmaariyom1@gmail.com", // Your receiving email
      subject: subject,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    return res.status(200).json({ message: "Your message has been sent!" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Email sending failed." });
  }
}
