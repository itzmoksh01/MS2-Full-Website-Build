import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// D1/SQLite storage schema for the Cloudflare deployment path.
// Same table/columns as shared/schema.ts's Postgres `contactMessages`, adapted
// to the sqlite-core dialect since D1 is SQLite, not Postgres. This file is
// NOT part of the original source — see MIGRATION-NOTES.md.
export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});
