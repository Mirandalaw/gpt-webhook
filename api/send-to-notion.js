export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    try {
        const { title, category, content } = req.body;

        // ✅ 너의 Make Webhook URL로 교체해야 함
        const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

        const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, content })
        });

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to send to Make' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('[Webhook Error]', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
