# TripTuner (MVP)

An AI-powered travel planning demo that uses a three-step workflow:
1) Fast metadata preview, 2) On-demand stop details, 3) Targeted edits (placeholder).

## Local Setup

```bash
npm install
# create .env file with your OpenAI key
echo "VITE_OPENAI_API_KEY=sk-..." > .env
# optional: custom base
echo "VITE_OPENAI_API_BASE=https://api.openai.com/v1" >> .env
npm run dev
```

## Netlify

- Set environment variable `VITE_OPENAI_API_KEY` in Netlify Site Settings → Build & Deploy → Environment.
- Deploy using the included `netlify.toml`.
- Build command: `npm run build`, Publish directory: `dist`.

## Notes

- Client-side key exposure is acceptable for demo purposes only.
- Replace placeholder models or adjust in `src/services/openaiService.js`.