import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ariyomiracle1234@gmail.com",
        pass: "bius czkl vvfe bghm",
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "emmaariyom1@gmail.com",
      subject: subject,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    return Response.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || "Failed to send email." }, { status: 500 });
  }
}
