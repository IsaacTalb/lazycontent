'use client';

import { useState, useEffect } from 'react';
import { Key, Database, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    geminiApiKey: '',
    notionToken: '',
    notionDatabaseId: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    geminiApiKey: false,
    notionToken: false,
    notionDatabaseId: false
  });

  const getGeminiApiKey = () => {
    window.open('https://makersuite.google.com/app/apikey', '_blank');
  };

  const getNotionIntegration = () => {
    window.open('https://www.notion.so/my-integrations', '_blank');
  };

  // Load settings from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = {
        geminiApiKey: localStorage.getItem('geminiApiKey') || '',
        notionToken: localStorage.getItem('notionToken') || '',
        notionDatabaseId: localStorage.getItem('notionDatabaseId') || '',
      };
      setSettings(savedSettings);
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!settings.geminiApiKey || !settings.notionToken || !settings.notionDatabaseId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (data.success) {
        // Save to localStorage
        localStorage.setItem('geminiApiKey', settings.geminiApiKey);
        localStorage.setItem('notionToken', settings.notionToken);
        localStorage.setItem('notionDatabaseId', settings.notionDatabaseId);
        alert('Settings saved successfully!');
        return;
      }

      // Handle API error
      alert(data.error || 'Failed to save settings');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleInputChange = (e, field) => {
    setSettings(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Settings</h3>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-900">
              <Key className="inline-block w-4 h-4 mr-2 align-middle" />
              Gemini API Key
              <span className="text-sm text-gray-500 ml-2">
                <button
                  onClick={getGeminiApiKey}
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Get API Key
                </button>
              </span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.geminiApiKey ? "text" : "password"}
                value={settings.geminiApiKey}
                onChange={(e) => handleInputChange(e, 'geminiApiKey')}
                className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black"
                placeholder={`Enter your Gemini API key`}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, geminiApiKey: !prev.geminiApiKey }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
              >
                {showPasswords.geminiApiKey ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Try different Gemini models if one doesn't work:
              <ul className="list-disc list-inside">
                <li>gemini-2.0</li>
                <li>gemini-2.0-flash</li>
                <li>gemini-2.5-flash-preview</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-900">
              <Key className="inline-block w-4 h-4 mr-2 align-middle" />
              Notion Integration Token
              <span className="text-sm text-gray-500 ml-2">
                <button
                  onClick={getNotionIntegration}
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Get Token
                </button>
              </span>
            </label>
            <div className="relative">
              <input
                type={showPasswords.notionToken ? "text" : "password"}
                value={settings.notionToken}
                onChange={(e) => handleInputChange(e, 'notionToken')}
                className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black"
                placeholder={"Enter your Notion integration token"}
              />
              <button
                type={"button"}
                onClick={() => setShowPasswords(prev => ({ ...prev, notionToken: !prev.notionToken }))}
                className={"absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"}
              >
                {showPasswords.notionToken ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              1. Go to Notion → Settings & Members → Integrations
              <br />
              2. Click &quot;New Integration&quot;
              <br />
              3. Copy the &quot;Internal Integration Token&quot;
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              <Database className="inline-block w-4 h-4 mr-2 align-middle" />
              Notion Database ID
            </label>
            <div className="relative">
              <input
                type={showPasswords.notionDatabaseId ? "text" : "password"}
                value={settings.notionDatabaseId}
                onChange={(e) => handleInputChange(e, 'notionDatabaseId')}
                className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black"
                placeholder="Enter your Notion database ID"
              />
              <button
                type={"button"}
                onClick={() => setShowPasswords(prev => ({ ...prev, notionDatabaseId: !prev.notionDatabaseId }))}
                className={"absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"}
              >
                {showPasswords.notionDatabaseId ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div> 
            <div className="text-sm text-gray-500">
              1. Click &quot;Duplicate&quot; button below to create your own database.
              <br />
              2. Copy the ID from your database URL (format: copy the ID code between notion.so/ and ?v look this example URL: https://www.notion.so/22cc9330d7311c80aa85eiroce68b8c45a07?v=)
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-gray-500 mb-4">
            Click &quot;Duplicate&quot; to create your own copy of the template database:
          </div>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={"https://bronzed-runner-8f0.notion.site/ebd/22ccd8d7311c80aa85ece68be8c45a07?v=22ccd8d7311c8008ae0e000c23d7d907"}
              width={"100%"}
              height={"600"}
              frameBorder={"0"}
              allowFullScreen
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}


