export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider
        auth: {
            user: "ariyomiracle1234@gmail.com", // Replace with your email
            pass: "nyci eqrc ugzx snpb", // Use an app password for security
        },
    });

    let mailOptions = {
        from: email,
        to: "emmaariyom1@gmail.com", // Your receiving email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: "Message sent successfully!" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to send message." });
    }
}