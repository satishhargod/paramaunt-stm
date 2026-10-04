import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get("name");
    const email = data.get("email");
    const mobile = data.get("mobile");
    const message = data.get("message");
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "principalparamount50748@gmail.com",
        pass: "fyqypsctstuvqirn",
      },
    });

    

    await transporter.sendMail({
      from: email,
      to: "principalparamount50748@gmail.com",
      subject: "New Career Application",
      html: `
        <h2>New Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    return Response.json({ message: "Application sent successfully!" });

  } catch (error) {
    return Response.json({ message: "Failed to send", error });
  }
}