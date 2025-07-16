import { useState } from 'react';
import { Cloud, Globe, ArrowRight, Clock, Sparkles } from 'lucide-react';
import Settings from '../components/Settings';
import SpeechToText from '../components/SpeechToText';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [transcription, setTranscription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const res = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        content: url,
        geminiApiKey: localStorage.getItem('geminiApiKey'),
        notionToken: localStorage.getItem('notionToken'),
        notionDatabaseId: localStorage.getItem('notionDatabaseId')
      }),
    });

    const data = await res.json();
    setMsg(data.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LazyContent
                </h1>
                <p className="text-sm text-gray-600">by DuckCloud</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>v2.0 - More features coming soon!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Settings */}
        <Settings />

        {/* Speech to Text */}
        <SpeechToText onTranscription={setTranscription} />

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Content Source
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      placeholder="Enter URL or paste transcription"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Speech to Text Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => setUrl(transcription)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center space-x-2"
                  disabled={!transcription}
                >
                  <Globe className="w-4 h-4" />
                  <span>Use Transcription</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>

              {/* Result Message */}
              {msg && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-700">{msg}</p>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal Support</h3>
            <p className="text-gray-600">Works with any blog post URL from any platform or website.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Powered</h3>
            <p className="text-gray-600">Reliable cloud infrastructure ensures 99.9% uptime and scalability.</p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 mr-2" />
            <h3 className="text-2xl font-bold">More Features Coming Soon!</h3>
          </div>
          <p className="text-blue-100 mb-6">
            We&apos;re working on exciting new features including batch processing, 
            advanced AI models, custom templates, and API access.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Batch Processing</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">API Access</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Custom Templates</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Advanced AI Models</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">DuckCloud</span>
          </div>
          <p className="text-gray-400">
            Building the future of content processing, one URL at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}