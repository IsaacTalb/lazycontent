import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const audioFile = req.body.audio;
    const geminiApiKey = req.body.geminiApiKey;

    if (!geminiApiKey) {
      return res.status(400).json({ error: 'Gemini API key is required' });
    }

    // Convert audio to base64
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    // Prepare the request for Google AI Studio Live Transcription
    const transcriptionResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                audio: {
                  audioData: audioBase64,
                  mimeType: 'audio/wav'
                }
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey
        }
      }
    );

    // Extract the transcription from the response
    const transcription = transcriptionResponse.data.candidates[0].content.parts[0].text;

    res.status(200).json({ transcription });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ error: error.message });
  }
}
