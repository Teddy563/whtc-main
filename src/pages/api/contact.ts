import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, message, browser, device, source, subject: customSubject } = body;
    const turnstileToken = body['cf-turnstile-response'];

    // Basic validation
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ message: "Toate câmpurile sunt obligatorii." }),
        { status: 400 }
      );
    }

    // Turnstile Verification
    const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
    if (secretKey) {
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ message: "Verificarea de securitate lipsește." }),
          { status: 400 }
        );
      }

      const ip = request.headers.get('CF-Connecting-IP');
      const formData = new FormData();
      formData.append('secret', secretKey);
      formData.append('response', turnstileToken);
      if (ip) formData.append('remoteip', ip);

      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        body: formData,
        method: 'POST',
      });

      const outcome = await result.json();
      if (!outcome.success) {
        return new Response(
          JSON.stringify({ message: "Verificarea de securitate a eșuat. Încearcă din nou." }),
          { status: 400 }
        );
      }
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return new Response(
        JSON.stringify({ message: "Eroare configurare server (API Key missing)." }),
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const emailSubject = customSubject ? `${customSubject} - ${name}` : `Mesaj nou de la ${name} (WHTC)`;

    const { data, error } = await resend.emails.send({
      from: import.meta.env.SENDER_EMAIL || "WHTC Website <no-reply@lockout-tagout.ro>",
      to: (import.meta.env.CONTACT_EMAIL || "office@lockout-tagout.ro,office@lttlock.com").split(",").map((e: string) => e.trim()),
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Mesaj Nou: ${customSubject || 'Contact General'}</h2>
          <p style="color: #666; font-size: 14px;"><strong>Buton / Secțiune:</strong> ${customSubject || 'N/A'}</p>
          <p style="color: #666; font-size: 14px;"><strong>Pagina Sursă:</strong> <a href="${source || '#'}">${source || 'Direct'}</a></p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; color: #666;">NUME:</p>
            <p style="margin: 0; font-weight: bold; font-size: 16px;">${name}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; color: #666;">EMAIL:</p>
            <p style="margin: 0; font-weight: bold; font-size: 16px;">${email}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; color: #666;">TELEFON:</p>
            <p style="margin: 0; font-weight: bold; font-size: 16px;">${phone}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0; color: #666;">MESAJ:</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
          </div>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <div style="background: #eee; padding: 10px; font-size: 11px; color: #555;">
             <p style="font-weight:bold; margin-bottom:5px;">DETALII TEHNICE:</p>
             <p style="margin: 2px 0;">Device: ${device || 'Necunoscut'}</p>
             <p style="margin: 2px 0;">Sursa: ${source || 'Direct'}</p>
             <p style="margin: 2px 0;">Browser: ${browser || 'Necunoscut'}</p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top:10px;">Acest email a fost trimis de pe site-ul WHTC (Securizat prin Turnstile).</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(
        JSON.stringify({ message: "Eroare la trimiterea emailului: " + error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Email trimis cu succes!", id: data?.id }),
      { status: 200 }
    );

  } catch (e) {
    console.error("Server Error:", e);
    return new Response(
      JSON.stringify({ message: "Eroare internă server." }),
      { status: 500 }
    );
  }
};
