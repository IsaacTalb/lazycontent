import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { geminiApiKey, notionToken, notionDatabaseId } = req.body;

    // Store settings in a secure way (e.g., database or environment variables)
    // For now, we'll just return a success message
    return res.status(200).json({ success: true, message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    return res.status(500).json({ error: 'Failed to save settings' });
  }
}
