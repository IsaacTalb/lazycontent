import axios from 'axios';
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { 
    content,
    notionToken, 
    notionDatabaseId,
    geminiApiKey,
    geminiModel = 'gemini-2.0-flash' // Default model
  } = req.body;

  if (!geminiApiKey) {
    return res.status(400).json({ error: 'Gemini API key is required' });
  }

  // Initialize Notion client
  const notionClient = new Client({ auth: notionToken });

  // Get content - either from URL or direct transcription
  let blogText = content;
  try {
    if (content.startsWith('http')) {
      // If it's a URL, fetch the content
      const response = await fetch(content);
      blogText = await response.text();
    } else {
      // If it's transcription, use it directly
      blogText = content;
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
    console.log('Making Gemini API request with API key:', geminiApiKey.substring(0, 10) + '...');
    console.log('Using model:', geminiModel);
    
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
      {
        contents: [{ parts: [{ text: geminiPrompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey
        }
      }
    );
    
    console.log('Gemini API Response:', geminiResponse.data);
    
    // Extract the response content from Gemini
    const responseContent = geminiResponse.data.candidates[0].content.parts[0].text;

    // Parse the JSON response
    let processedContent;
    try {
      processedContent = JSON.parse(responseContent);
    } catch (err) {
      console.error('Error parsing Gemini response:', err);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }
    
    // Create Notion page
    const notionPage = await notionClient.pages.create({
      parent: {
        database_id: notionDatabaseId,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: processedContent.Title || 'Untitled',
              },
            },
          ],
        },
        'Original Content': {
          rich_text: [
            {
              text: {
                content: blogText,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                text: {
                  content: 'Summary',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.Summary || 'No summary available',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                text: {
                  content: 'Social Media Content',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                text: {
                  content: 'Facebook',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.Facebook.Caption || 'No caption available',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                text: {
                  content: 'LinkedIn',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.LinkedIn.Caption || 'No caption available',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                text: {
                  content: 'Threads',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.Threads.Caption || 'No caption available',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                text: {
                  content: 'YouTube',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.YouTube.Description || 'No description available',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [
              {
                text: {
                  content: 'Instagram',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: processedContent.Instagram.Caption || 'No caption available',
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
