// routes/agentRoutes.js — AI tour-guide agent.
// Talks to an OpenAI-compatible endpoint (local ollama by default: no key,
// no cloud cost). The guide gets the tour as context and may emit a
// <<<goto:N>>> directive anywhere in the reply; the client teleports the
// camera to hotspot N — real tool-use, tiny surface.
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

const OLLAMA = process.env.AGENT_BASE_URL || 'http://127.0.0.1:11434';
const MODEL = process.env.AGENT_MODEL || 'gpt-oss:120b-cloud';

async function chatWithGuide(tourId, history) {
  const tour = await Tour.findById(tourId).lean();
  if (!tour) throw Object.assign(new Error('tour not found'), { status: 404 });

  const spotList = (tour.hotspots || [])
    .map((h, i) => `${i}: "${h.description}" at position ${h.position}`)
    .join('; ');
  const system =
    `You are the AI guide of the virtual-tour app. Tour data:\n` +
    `title: ${tour.title}\nlocation: ${tour.location}\n` +
    `category: ${tour.category}\ndescription: ${tour.description}\n` +
    `tags: ${(tour.tags || []).join(', ')}\n` +
    (spotList ? `hotspots: ${spotList}\n` : 'hotspots: none\n') +
    `Answer briefly (max 120 words), friendly. ` +
    (spotList
      ? `If the visitor wants to see a hotspot and one exists for it, append ` +
        `a directive <<<goto:N>>> on its own line, where N is that hotspot index. Example: "Heading there!"\n<<<goto:0>>>\n`
      : `Do not emit goto directives (no hotspots exist).\n`);

  const body = JSON.stringify({
    model: MODEL,
    stream: false,
    options: { temperature: 0.4 },
    messages: [{ role: 'system', content: system },
               ...history.slice(-8).map(m =>
                 ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))],
  });
  const r = await fetch(`${OLLAMA}/api/chat`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
  });
  if (!r.ok) throw Object.assign(new Error(`guide backend ${r.status}`), { status: 502 });
  const d = await r.json();
  return d.message && d.message.content;
}

router.post('/agent/chat', async (req, res) => {
  try {
    const { tourId, messages = [{ role: 'user', content: 'Introduce yourself briefly.' }] } = req.body || {};
    if (!tourId) return res.status(400).json({ error: 'tourId required' });
    const reply = await chatWithGuide(tourId, messages);
    res.json({ reply });
  } catch (err) {
    console.error('agent error:', err.message);
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;