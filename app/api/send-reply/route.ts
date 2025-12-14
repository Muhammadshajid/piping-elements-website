import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    await resend.emails.send({
      from: "Piping Elements <noreply@pipingelements.com>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif">
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <hr />
          <p style="font-size:12px;color:#666">
            Piping Elements – Engineering Intelligence & Supply Chain Expertise
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
