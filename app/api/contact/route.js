// app/api/contact/route.js
import nodemailer from "nodemailer";
import { z } from "zod";

/** Fuerza Node.js (no Edge) y evita caching del handler en Vercel */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCENT = "#bb55ff";

const ContactSchema = z.object({
  firstname: z.string().min(2, "Nombre demasiado corto"),
  lastname: z.string().min(2, "Apellido demasiado corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().default(""),
  service: z.string().optional().default(""),
  message: z.string().min(10, "Mensaje demasiado corto"),
  website: z.string().optional().default(""), // honeypot
});

/** Escapar HTML básico para el cuerpo del mensaje del usuario */
function escapeHtml(str = "") {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function generateEmailHtml({ firstname, lastname, email, phone, service, message }) {
  const fullName = `${firstname} ${lastname}`.trim();
  const preheader = `Nuevo contacto de ${fullName}${service ? " · " + service : ""}. Responde este correo para continuar.`;

  return `<!DOCTYPE html><html lang="es"><head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Nuevo contacto</title>
  <meta name="color-scheme" content="dark light" />
  <meta name="supported-color-schemes" content="dark light" />
</head>
<body style="margin:0;padding:0;background:#0f0f12;color:#eaeaea;word-break:break-word;">
  <!-- preheader oculto -->
  <div style="display:none;opacity:0;visibility:hidden;max-height:0;overflow:hidden;mso-hide:all;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f12;">
    <tr>
      <td style="padding:24px;">
        <table role="presentation" style="width:640px;max-width:640px;margin:0 auto;background:#1b1b21;border:1px solid #2a2a32;border-radius:12px;">
          <tr>
            <td style="padding:24px 24px 12px 24px;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="width:44px;">
                    <div style="width:44px;height:44px;border-radius:999px;background:${ACCENT};display:inline-block;line-height:44px;text-align:center;">
                      <span style="font-size:22px;display:inline-block;transform:translateY(1px)">✉️</span>
                    </div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <h1 style="margin:0;font-family:Inter,Arial,sans-serif;font-size:18px;line-height:24px;color:#fff;">
                      Nuevo contacto
                    </h1>
                    <p style="margin:4px 0 0 0;font-size:12px;line-height:16px;color:#b9b9c0;">
                      Recibiste un mensaje desde tu portfolio.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 24px 0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px;">
                <tr>
                  <td style="width:1%;white-space:nowrap;padding:8px 12px;border:1px solid #2a2a32;border-right:none;border-radius:8px 0 0 8px;background:#141419;">👤</td>
                  <td style="padding:8px 12px;border:1px solid #2a2a32;border-radius:0 8px 8px 0;background:#141419;color:#eaeaea;">
                    <strong>Nombre:</strong> ${fullName}
                  </td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;padding:8px 12px;border:1px solid #2a2a32;border-right:none;border-radius:8px 0 0 8px;background:#141419;">📧</td>
                  <td style="padding:8px 12px;border:1px solid #2a2a32;border-radius:0 8px 8px 0;background:#141419;color:#eaeaea;">
                    <strong>Email:</strong> <a href="mailto:${email}" style="color:${ACCENT};text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;padding:8px 12px;border:1px solid #2a2a32;border-right:none;border-radius:8px 0 0 8px;background:#141419;">📱</td>
                  <td style="padding:8px 12px;border:1px solid #2a2a32;border-radius:0 8px 8px 0;background:#141419;color:#eaeaea;">
                    <strong>Celular:</strong> ${phone || "(no especificado)"}
                  </td>
                </tr>
                <tr>
                  <td style="white-space:nowrap;padding:8px 12px;border:1px solid #2a2a32;border-right:none;border-radius:8px 0 0 8px;background:#141419;">🧩</td>
                  <td style="padding:8px 12px;border:1px solid #2a2a32;border-radius:0 8px 8px 0;background:#141419;color:#eaeaea;">
                    <strong>Servicio:</strong> ${service || "(no especificado)"}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 8px 24px;">
              <p style="margin:0 0 8px 0;font-family:Inter,Arial,sans-serif;font-size:13px;color:#ddd;">Mensaje</p>
              <div style="background:#121217;border:1px solid #2a2a32;border-radius:8px;padding:14px;color:#eaeaea;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">
${escapeHtml(message)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px 24px 24px;">
              <a href="mailto:${email}" style="display:inline-block;background:${ACCENT};color:#0f0f12;text-decoration:none;border-radius:8px;padding:10px 14px;font-weight:600;">
                Responder a ${firstname}
              </a>
              <span style="display:inline-block;margin-left:8px;color:#9a9aa2;font-size:12px;">
                o responde directamente a este correo (Reply)
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 24px 24px;">
              <p style="margin:0;font-size:11px;line-height:16px;color:#8b8b92;">
                Enviado automáticamente por tu portfolio. Si no esperabas este mensaje, ignóralo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body></html>`;
}

/** Crea el transporter con opciones seguras para serverless */
function makeTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  // Validación de entorno (evita undefined silenciosos)
  const missing = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_TO"].filter(
    (k) => !process.env[k]
  );
  if (missing.length) {
    throw new Error(`Config error: faltan variables ${missing.join(", ")}`);
  }

  const port = Number(SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 TLS directo, 587 STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // timeouts útiles en serverless
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export async function POST(req) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, error: "Validación", issues: parsed.error.flatten() }),
        { status: 400 }
      );
    }

    const { firstname, lastname, email, phone, service, message, website } = parsed.data;

    // Honeypot (bots)
    if (website && website.trim() !== "") {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const transporter = makeTransporter();

    // (Opcional) Verificar conexión en dev/preview
    if (process.env.VERCEL_ENV !== "production") {
      try {
        await transporter.verify();
      } catch (e) {
        console.error("[SMTP_VERIFY_ERROR]", e);
      }
    }

    const subject = `Portfolio: ${firstname} ${lastname}${service ? ` · ${service}` : ""}`;
    const bodyText = `Nuevo contacto desde el portfolio:

Nombre: ${firstname} ${lastname}
Email: ${email}
Celular: ${phone || "(no especificado)"}
Servicio: ${service || "(no especificado)"}

Mensaje:
${message}
`;

    const info = await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.SMTP_USER}>`, // Gmail: debe ser el mismo user
      to: process.env.EMAIL_TO, // ¡Asegúrate de que la var en Vercel se llama EMAIL_TO!
      replyTo: email,
      subject,
      text: bodyText,
      html: generateEmailHtml({ firstname, lastname, email, phone, service, message }),
    });

    return new Response(JSON.stringify({ ok: true, id: info?.messageId || null }), {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[CONTACT_API_ERROR]", err);

    // En producción devolvemos mensaje neutro; en dev/preview damos pista
    const detail =
      process.env.VERCEL_ENV === "production"
        ? "Internal Error"
        : `${err?.code || ""} ${err?.response || err?.message || ""}`.trim();

    return new Response(JSON.stringify({ ok: false, error: detail }), {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
