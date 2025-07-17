import { useState, useRef, useEffect } from 'react';
import { Mic, Pause, Play, Loader2, Save, RotateCw, AlertCircle } from 'lucide-react';
import axios from 'axios';
import mime from 'mime';

export default function SpeechToText({ onTranscription }) {
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const handleSave = () => {
    if (!transcription) return;
    
    onTranscription({
      content: transcription,
      geminiApiKey: localStorage.getItem('geminiApiKey')
    });
    setIsSaved(true);
    setError('');
  };

  const handleClear = () => {
    setTranscription('');
    setIsSaved(false);
    setError('');
  };

  const handleAudio = async (audioBlob) => {
    if (!audioBlob) return;
    setIsRecording(false);
    setIsProcessing(true);
    setError('');

    const geminiApiKey = localStorage.getItem('geminiApiKey');
    if (!geminiApiKey) {
      setError('Please configure your Gemini API key in the Settings first!');
      setIsProcessing(false);
      return;
    }

    try {
      const audioBase64 = Buffer.from(await audioBlob.arrayBuffer()).toString('base64');
      const mimeType = audioBlob.type || 'audio/wav';

      const response = await axios.post('/api/live-transcribe', {
        audio: {
          inlineData: {
            data: audioBase64,
            mimeType
          }
        },
        geminiApiKey
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setTranscription(response.data.transcription);
      setIsProcessing(false);
      setIsSaved(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to transcribe audio');
      setIsProcessing(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        handleAudio(audioBlob);
        audioChunks.length = 0;
      };

      mediaRecorder.start();
      setIsRecording(true);

      return () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current = null;
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
    } catch (err) {
      setError('Failed to start recording: ' + err.message);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (!isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [isRecording]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        {isRecording ? (
          <button
            onClick={() => {
              setIsRecording(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            disabled={isProcessing}
          >
            <Pause className="w-5 h-5" />
            <span>Stop Recording</span>
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            disabled={isProcessing || isSaved}
          >
            <Mic className="w-5 h-5" />
            <span>Start Recording</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Processing transcription...</span>
        </div>
      )}

      {transcription && !isProcessing && (
        <div className="mt-6">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={transcription}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black placeholder-gray-500"
                placeholder="Your transcription will appear here..."
                readOnly
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {transcription.length} characters
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClear}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
                disabled={isProcessing || !transcription}
              >
                <RotateCw className="w-4 h-4" />
                <span>Clear</span>
              </button>

              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
                disabled={isProcessing || !transcription || isSaved}
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
