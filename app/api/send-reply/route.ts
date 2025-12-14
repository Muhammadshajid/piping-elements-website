import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Piping Elements <info@pipingelements.com>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <hr/>
          <p><strong>Piping Elements</strong><br/>
          Engineering Intelligence & Supply Chain Expertise</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
