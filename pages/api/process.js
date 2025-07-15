import axios from 'axios';
import { Client } from '@notionhq/client';

// Get environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { 
    content,
    notionToken, 
    notionDatabaseId,
    geminiModel = 'gemini-2.0-flash' // Default model
  } = req.body;

  const geminiApiKey = process.env.GEMINI_API_KEY;

  // Initialize Notion client
  const notionClient = new Client({ auth: notionToken });

  // If content is a URL, fetch it first
  let blogText = content;
  try {
    if (content.startsWith('http')) {
      const response = await fetch(content);
      blogText = await response.text();
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    return res.status(500).json({ error: 'Failed to fetch content' });
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
  ...
}

${blogText}
`;

  try {
    console.log('Making Gemini API request with API key:', GEMINI_API_KEY.substring(0, 10) + '...');
    console.log('Using model:', geminiModel);
    
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: geminiPrompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Gemini API Response:', geminiResponse.data);
    
    // Extract the response content from Gemini
    const responseContent = geminiResponse.data.candidates[0].content.parts[0].text;
    
    // Try to parse the JSON response
    const sections = JSON.parse(responseContent.replace(/```json|```/g, '').trim());
    
    // Create Notion page
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

    return res.status(200).json({
      message: 'Processed successfully',
      data: sections
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
