import axios from 'axios';
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const {
    content,
    notionToken,
    notionDatabaseId,
    geminiApiKey,
    geminiModel = 'gemini-2.0-flash' // default model
  } = req.body;

  if (!notionToken || !notionDatabaseId || !geminiApiKey || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Initialize Notion client with user token
  const notionClient = new Client({ auth: notionToken });

  // If content is a URL, fetch it
  let blogText = content;
  try {
    if (content.startsWith('http')) {
      const response = await fetch(content);
      blogText = await response.text();
    }
  } catch (error) {
    console.error('Error fetching URL content:', error);
    return res.status(500).json({ error: 'Failed to fetch content from URL' });
  }

  const geminiPrompt = `
You're a social media content strategist AI.

I will provide a blog post URL or full article content. Your task is to:
1. Read and summarize the content.
2. Generate a short and catchy title (max 12 words).
3. Create social media captions, tags, and relevant hashtags for each of the following platforms:
   - Facebook
   - LinkedIn
   - Threads
   - YouTube
   - Instagram
4. Generate a 60-second social media script to be used in a vertical video (reel/short).

Respond in this JSON format:

{
  "Title": "...",
  "Summary": "...",
  "Facebook": {
    "Caption": "...",
    "Tags": "...",
    "Hashtags": "..."
  },
  "LinkedIn": { ... },
  "Threads": {
    "Caption": "...",
    "Tags": "...",
    "Hashtags": "..."
  },
  "YouTube": {
    "Description": "...",
    "Tags": "...",
    "Hashtags": "..."
  },
  "Instagram": {
    "Caption": "...",
    "Tags": "...",
    "Hashtags": "..."
  },
  "ReelScript": "..."
}

${blogText}
`;

  try {
    console.log(`Calling Gemini with model: ${geminiModel}`);

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
      {
        contents: [{ parts: [{ text: geminiPrompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const responseContent = geminiResponse.data.candidates[0]?.content?.parts[0]?.text;

    const sections = JSON.parse(responseContent.replace(/```json|```/g, '').trim());

    // Create page in Notion
    await notionClient.pages.create({
      parent: { database_id: notionDatabaseId },
      properties: {
        Name: { title: [{ text: { content: sections.Title || 'Untitled' } }] },
        URL: { url: content },
        Title: { rich_text: [{ text: { content: sections.Title || '' } }] },
        Summary: { rich_text: [{ text: { content: sections.Summary || '' } }] },
        Facebook: {
          rich_text: [{ text: { content: sections.Facebook?.Caption || '' } }],
        },
        LinkedIn: {
          rich_text: [{ text: { content: sections.LinkedIn?.Caption || '' } }],
        },
        Threads: {
          rich_text: [{ text: { content: sections.Threads?.Caption || '' } }],
        },
        YouTube: {
          rich_text: [{ text: { content: sections.YouTube?.Description || '' } }],
        },
        Instagram: {
          rich_text: [{ text: { content: sections.Instagram?.Caption || '' } }],
        },
        ReelScript: {
          rich_text: [{ text: { content: sections.ReelScript || '' } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: JSON.stringify(sections, null, 2).slice(0, 2000), // Preview block
                },
              },
            ],
          },
        },
      ],
    });

    return res.status(200).json({
      message: 'Processed and added to Notion successfully.',
      data: sections
    });
  } catch (error) {
    console.error('Processing error:', error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
