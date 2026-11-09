# ESI One — AI Scope Review Starter v0.5

A deployable Next.js wrapper around the existing ESI proposal generator. Adds authenticated OpenAI-backed scope review for text-based project documents and sends estimator-approved wording into the existing editor.

## Setup (existing Vercel + Supabase accounts)

1. Create a **private GitHub repository** and upload the contents of this folder (not just the ZIP).
2. In Supabase: open an existing project or create one; in Authentication > Providers enable Email; disable public sign-ups; in Authentication > Users invite/create your estimator email account. Copy the Project URL and publishable/anon key from Project Settings / API. **Do not use the service-role key.**
3. Create an API key at https://platform.openai.com/api-keys. OpenAI API billing is separate from ChatGPT.
4. In Vercel: Add New > Project > import the GitHub repository; framework should detect Next.js. Add environment variables shown in `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (a publishable key or legacy anon key)
   - `OPENAI_API_KEY` (server only; **never NEXT_PUBLIC_**)
   - `OPENAI_MODEL` (default `gpt-5.5`)
   - `ALLOWED_EMAILS` (comma-separated emails, required for AI endpoint)
5. Deploy. Sign in with your Supabase email/password user and run a small text-based PDF review. Check extracted metadata, citations, and edit/approve recommendations. Use **Apply approved results** to copy approved text into the embedded generator.
6. Save and export through the existing proposal interface. **This build does not provide shared database persistence**, so browser-local draft storage should not be considered durable production storage.

## Local development

`npm install` then copy `.env.example` to `.env.local` and enter your own credentials, then `npm run dev`. Open http://localhost:3000.

## Scope and limitations

- Uses Supabase Authentication token verification + explicit `ALLOWED_EMAILS` authorization on the server, and OpenAI Responses API with structured output.
- Files are parsed transiently in the server process and are **not stored** in Supabase; the OpenAI API receives extracted project text for analysis with `store:false` set. Confirm contractual/data-processing permissions before uploading client material.
- Up to 3 small files per review; PDFs are text-extracted, NOT visually interpreted. Scanned drawings/one-lines/sheets may extract little or nothing. The UI warns when extraction is insufficient. This is not comprehensive plans-and-specifications review yet.
- Vercel request payload limits mean large bid packages will require browser-direct uploads to private Supabase Storage plus background/queued processing.
- Citations are checked against extracted source text, but all findings remain estimator suggestions.
- Users cannot self-register through this application. Restrict Supabase signup and invite trusted employees. **The legacy generator HTML remains available as a static URL `/generator.html`** and contains only browser-local functionality; treat the deployment as a development environment, do not enter sensitive bids into the static generator until it is moved behind authenticated access and drafts are protected in the database.
- Clause approval transfers recommended inclusion/exclusion/clarification text into the existing generator. For persistent production work, the iframe editor should be refactored as a native authenticated Next.js component.

## Suggested next iteration

1. Move the embedded generator into authenticated React components and use a full shared proposals database.
2. Private Supabase Storage and signed client uploads; track document hashes, addenda and citations.
3. Asynchronous document processing with visual drawing review and page/sheet references.
4. Saved review history and estimator approval records.
