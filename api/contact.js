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
    from: `Your Name <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,  // Receiving email (yours)
    replyTo: formData.get("email"), // The user's email, so you can reply directly
    subject: `New Contact Message from ${formData.get("name")}`,
    html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">📩 New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.get("name")}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.get("email")}" style="color: #3498db;">${formData.get("email")}</a></p>
            <p><strong>Subject:</strong> ${formData.get("subject")}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${formData.get("message")}</p>
            <hr>
            <p style="text-align: center; font-size: 12px; color: #555;">This message was sent via your website contact form.</p>
        `
};

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: "Message sent successfully!" });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send message." });
    }
}