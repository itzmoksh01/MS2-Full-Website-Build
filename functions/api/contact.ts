import { z } from "zod";
import { api } from "../../shared/routes";

// Cloudflare Pages Function for POST /api/contact.
// NOT part of the original source (which only ran Express + Postgres) — see
// MIGRATION-NOTES.md. Reuses the exact same Zod input schema the original
// server/routes.ts used (imported from shared/routes.ts), so validation
// behavior is unchanged. Storage moves to Cloudflare D1 (SQLite) instead of
// Postgres, and a Web3Forms email notification is fired after a successful
// insert — both required only for the Cloudflare-hosted deployment path.

interface Env {
  DB: D1Database;
  WEB3FORMS_ACCESS_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = api.contact.create.input.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return Response.json(
      {
        message: firstError.message,
        field: firstError.path.join("."),
      },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;
  const createdAt = Math.floor(Date.now() / 1000);

  let insertedId: number;
  try {
    const result = await context.env.DB.prepare(
      "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, ?)",
    )
      .bind(name, email, message, createdAt)
      .run();
    insertedId = Number(result.meta.last_row_id);
  } catch (err) {
    console.error("D1 insert failed:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }

  // Best-effort email notification — a failure here must not fail the
  // request, since the message is already safely stored in D1.
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: context.env.WEB3FORMS_ACCESS_KEY,
        subject: "New contact form submission — MS2 Entertainment",
        name,
        email,
        message,
      }),
    });
  } catch (err) {
    console.error("Web3Forms notification failed (non-fatal):", err);
  }

  return Response.json(
    {
      id: insertedId,
      name,
      email,
      message,
      createdAt: new Date(createdAt * 1000).toISOString(),
    },
    { status: 201 },
  );
};

// keep TS aware of the schema-only zod import path used above
type _InputType = z.infer<typeof api.contact.create.input>;
