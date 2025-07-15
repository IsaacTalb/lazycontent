import { useState, useRef } from 'react';
import { Mic, Pause, Play } from 'lucide-react';

export default function SpeechToText({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const recognition = useRef(null);

  const startRecording = () => {
    if (!recognition.current) {
      // Use webkitSpeechRecognition if available, otherwise fall back to SpeechRecognition
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in this browser');
        return;
      }

      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscription(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.current.onend = () => {
        setIsRecording(false);
      };
    }

    recognition.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsRecording(false);
    }
  };

  const handleProcess = async () => {
    if (!transcription) {
      alert('Please record some speech first!');
      return;
    }

    const geminiApiKey = localStorage.getItem('geminiApiKey');
    const notionToken = localStorage.getItem('notionToken');
    const notionDatabaseId = localStorage.getItem('notionDatabaseId');
    if (!geminiApiKey || !notionToken || !notionDatabaseId) {
      alert('Please configure your API keys in the Settings first!');
      return;
    }

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: transcription,
          geminiApiKey,
          notionToken,
          notionDatabaseId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process content');
      }

      const data = await response.json();
      
      // Clear transcription after successful processing
      setTranscription('');
      alert('Content processed successfully!');
      onTranscription(transcription);
    } catch (error) {
      console.error('Error processing content:', error);
      alert('Failed to process content. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Speech to Text</h3>
        <div className="flex space-x-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center space-x-2"
          >
            {isRecording ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </>
            )}
          </button>
          <button
            onClick={handleProcess}
            disabled={!transcription || isProcessing}
            className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
              !transcription || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Process Content</span>
          </button>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="Your transcription will appear here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
    </div>
  );
}
