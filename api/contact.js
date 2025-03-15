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
			from: `iPortfolio - Emmanuel Ariyo ~ <${process.env.EMAIL_USER}>`, 
			replyTo: email, 
    to: process.env.EMAIL_USER,
    subject: `New Message from: ${name} - ${subject}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            <h2 style="background: #007bff; color: white; padding: 10px; text-align: center;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f4f4f4; padding: 15px; border-left: 4px solid #007bff;">${message}</p>
            <hr>
            <p style="text-align: center; font-size: 12px; color: #666;">This message was sent from: <a href="https://portfolio-brocode.vercel.app " target="_blank">Your Portfolio</a></p>
        </div>
    `,
};
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: "Message sent successfully!" });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send message." });
    }
}