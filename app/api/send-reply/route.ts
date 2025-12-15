import { Resend } from "resend";

/**
 * IMPORTANT:
 * Do NOT create the Resend client at module-load time.
 * During Next.js build, route modules can be evaluated and will crash
 * if RESEND_API_KEY is missing. We create the client inside POST instead.
 */

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { to, subject, message } = await req.json();

    await resend.emails.send({
      from: "Piping Elements <noreply@pipingelements.com>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif">
          <p>${String(message ?? "").replace(/\n/g, "<br/>")}</p>
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
