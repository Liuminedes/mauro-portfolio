import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstname, lastname, email, phone, service, message } = await req.json();

    // Validación mínima
    if (!firstname || !lastname || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Campos requeridos faltantes" }), { status: 400 });
    }

    const bodyText = `Nuevo contacto desde el portfolio:

Nombre: ${firstname} ${lastname}
Email: ${email}
Celular: ${phone || "(no especificado)"}
Servicio: ${service || "(no especificado)"}

Mensaje:
${message}
`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email, // para que puedas responderle directo
      subject: "Nuevo contacto desde el portfolio",
      text: bodyText,
      html: `<pre style="font-size:14px;line-height:1.5">${bodyText}</pre>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("[CONTACT_API_ERROR]", err);
    return new Response(JSON.stringify({ ok: false, error: "Internal Error" }), { status: 500 });
  }
}
