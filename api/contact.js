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
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, 
            },
        });

        // 1️⃣ Send Email to Yourself
        let mailOptions = {
            from: `iPortfolio - Emmanuel Ariyo ~ <${email}>`, 
            replyTo: email, 
            to: process.env.TO_MAIL, // Your email
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
                    <p style="text-align: center; font-size: 12px; color: #666;">This message was sent from: <a href="https://portfolio-brocode.vercel.app" target="_blank">Your Portfolio</a></p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        // 2️⃣ Send Confirmation Email to User
        let confirmationMailOptions = {
            from: `"iPortfolio - Emmanuel Ariyo" <${process.env.EMAIL_USER}>`, 
            to: email, // Send to user
            subject: "Thank You for Contacting iPortfolio",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
                    <h2 style="background: #28a745; color: white; padding: 10px; text-align: center;">Message Received</h2>
                    <p>Hello <strong>${name}</strong>,</p>
                    <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                    <p><strong>Your Message:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-left: 4px solid #28a745;">${message}</p>
                    <hr>
                    <p style="text-align: center; font-size: 12px; color: #666;">Sent from <a href="https://portfolio-brocode.vercel.app" target="_blank">My Portfolio</a></p>
                </div>
            `,
        };

        await transporter.sendMail(confirmationMailOptions);

        return res.status(200).json({ success: "Messages sent successfully!" });

    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send message." });
    }
}