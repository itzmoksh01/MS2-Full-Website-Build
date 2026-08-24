# Deploying to Cloudflare Pages (D1 + Web3Forms contact form)

Everything code-side is already built and verified locally (see
`MIGRATION-NOTES.md` → "Cloudflare Pages deployment path"). What's left
requires *your* accounts/logins — I can't create accounts or run interactive
browser logins on your behalf. Run these in order, from `./clone`:

## 1. Install & log in to Wrangler (one-time, opens your browser)
```bash
npm install -g wrangler
wrangler login
```
This needs your own Cloudflare account (sign up free at
https://dash.cloudflare.com if you haven't already).

## 2. Create the real D1 database
```bash
npx wrangler d1 create ms2-contact-db
```
This prints something like:
```
[[d1_databases]]
binding = "DB"
database_name = "ms2-contact-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```
Copy that `database_id` value and paste it into `wrangler.toml`, replacing
`REPLACE_WITH_REAL_DATABASE_ID`. (Or just tell me the id and I'll do it.)

## 3. Apply the migration to the real (remote) database
```bash
npx wrangler d1 execute ms2-contact-db --remote --file=d1-migrations/0000_create_contact_messages.sql
```

## 4. Get a Web3Forms access key
Sign up free at https://web3forms.com — it emails you an access key
immediately, no domain verification needed. Then set it as a Pages secret:
```bash
npx wrangler pages secret put WEB3FORMS_ACCESS_KEY
```
(paste the key when prompted). For local testing before deploying, you can
also copy `.dev.vars.example` to `.dev.vars` and put the real key there —
`.dev.vars` is git-ignored, never committed.

## 5. Deploy
```bash
npm run cf:deploy
```
This runs `npm run build` then `wrangler pages deploy dist/public`. First
run will ask you to confirm/create the Pages project name
(`ms2-entertainment-hub`, matching `wrangler.toml`). Wrangler will print the
live `*.pages.dev` URL when done.

(Alternative to steps 2–5, if you'd rather have auto-deploys on every git
push: in the Cloudflare dashboard, go to Workers & Pages → Create →
connect your GitHub repo, set build command `npm run build`, output
directory `dist/public`, then add the D1 binding and `WEB3FORMS_ACCESS_KEY`
secret in the project's Settings tab instead of via CLI.)

## 6. Point your GoDaddy domain at Cloudflare
1. In the Cloudflare dashboard, click **Add a domain**, enter your domain,
   choose the Free plan.
2. Cloudflare will show you two nameservers (e.g.
   `xxx.ns.cloudflare.com`, `yyy.ns.cloudflare.com`).
3. In GoDaddy → My Products → your domain → DNS/Nameservers → change to
   **Custom** and enter those two Cloudflare nameservers.
4. Propagation is usually fast (minutes to a few hours). Cloudflare's
   dashboard will show "Active" once it's done.
5. In your Cloudflare Pages project → Custom domains, add your domain —
   Cloudflare handles the rest (SSL cert, routing) automatically.

## Verifying it's live
- Visit your domain (or the `*.pages.dev` URL) — full site should render
  identically to the local/preview checks already done.
- Submit the contact form for real — check:
  - The email arrives via Web3Forms.
  - The row is in D1: `npx wrangler d1 execute ms2-contact-db --remote --command="SELECT * FROM contact_messages;"`

---

**What I need from you to finish this on your end:** the `database_id` from
step 2 (if you'd like me to fill in `wrangler.toml` rather than doing it
yourself), and confirmation once you've set the Web3Forms secret and want
me to run the deploy command.
