import { GoogleGenAI, Modality, MediaResolution } from '@google/genai';
import mime from 'mime';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audio, geminiApiKey } = req.body;
    if (!audio || !geminiApiKey) {
      return res.status(400).json({ error: 'Audio and Gemini API key are required' });
    }

    const ai = new GoogleGenAI({
      apiKey: geminiApiKey,
    });

    const model = 'models/gemini-2.5-flash-preview-native-audio-dialog';

    const config = {
      responseModalities: [Modality.AUDIO],
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: 'Zephyr',
          }
        }
      },
      contextWindowCompression: {
        triggerTokens: '25600',
        slidingWindow: { targetTokens: '12800' },
      },
    };

    const session = await ai.live.connect({
      model,
      callbacks: {
        onopen: () => {
          console.log('Session opened');
        },
        onmessage: (message) => {
          // Handle incoming messages
          console.log('Message received:', message);
        },
        onerror: (e) => {
          console.error('Error:', e.message);
        },
        onclose: (e) => {
          console.log('Session closed:', e.reason);
        },
      },
      config,
    });

    // Send audio data
    session.sendClientContent({
      turns: [audio]
    });

    // Wait for response
    const response = await new Promise((resolve, reject) => {
      let messages = [];
      let done = false;

      session.onmessage = (message) => {
        messages.push(message);
        if (message.serverContent && message.serverContent.turnComplete) {
          done = true;
          resolve(messages);
        }
      };

      session.onerror = (error) => {
        reject(error);
      };
    });

    // Process response
    function handleModelTurn(message) {
      if (message.serverContent?.modelTurn?.parts) {
        const parts = message.serverContent.modelTurn.parts;
        const textParts = parts.filter(part => part?.text).map(part => part.text);
        return textParts.join(' ');
      }
      return '';
    }

    const transcription = response
      .map(handleModelTurn)
      .filter(Boolean)
      .join(' ');

    session.close();

    return res.status(200).json({ transcription });
  } catch (error) {
    console.error('Error in live transcription:', error);
    return res.status(500).json({ error: error.message });
  }
}
