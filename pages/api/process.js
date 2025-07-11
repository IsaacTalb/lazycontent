import axios from 'axios';
import notion from '../../lib/notion';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { url } = req.body;

  const blogText = await fetch(url).then(r => r.text());

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
  ...
}

${blogText}
`;

  const geminiResponse = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: geminiPrompt }] }],
    }
  );

  const rawOutput = geminiResponse.data.candidates[0].content.parts[0].text;

  console.log('[Gemini Raw Output]', rawOutput);

  // Strip ```json ``` and ``` if wrapped
  const cleanOutput = rawOutput.replace(/```json|```/g, '').trim();

  let sections;
  try {
    sections = JSON.parse(cleanOutput);
  } catch (err) {
    console.error('❌ Failed to parse Gemini JSON output:', err.message);
    return res.status(500).json({ error: 'Gemini output parsing failed' });
  }

  // Create the Notion page with mapped properties
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: sections.Title || 'Untitled' } }] },
      URL: { url },
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
        rich_text: [{ text: { content: sections['ReelScript'] || '' } }],
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
                content: JSON.stringify(sections, null, 2).slice(0, 2000), // Preview in block
              },
            },
          ],
        },
      },
    ],
  });

  return res.status(200).json({ message: 'Processed successfully' });
}
