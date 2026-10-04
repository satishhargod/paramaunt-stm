import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

     const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: "principalparamount50748@gmail.com",
           pass: "fyqypsctstuvqirn",
         },
       });

    await transporter.sendMail({
      from: `"Admission Enquiry" <principalparamount50748@gmail.com>`,
      to: "principalparamount50748@gmail.com",
      subject: "New Admission Enquiry",
      html: `
        <h3>New Admission Enquiry</h3>
        <p><b>Student Name:</b> ${data.studentName}</p>
        <p><b>Class:</b> ${data.className}</p>
        <p><b>Parent Name:</b> ${data.parentName}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}