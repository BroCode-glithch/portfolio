export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const nodemailer = require("nodemailer");

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables
                pass: process.env.EMAIL_PASS, 
            },
        });

        let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: "Message sent successfully!" });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send message." });
    }
}