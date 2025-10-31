export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
    const required = ['name','phone','email','address','service','date'];
    const missing = required.filter(k => !data?.[k]);
    if (missing.length) return res.status(400).json({ ok: false, error: `Missing: ${missing.join(', ')}` });
    // TODO: Pipe to email/Slack/CRM here.
    console.log('New booking:', data);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(400).json({ ok: false, error: 'Bad Request' });
  }
};
