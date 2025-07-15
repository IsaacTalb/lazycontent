'use client';

import { useState, useEffect } from 'react';
import { Key, Database } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    geminiApiKey: '',
    notionToken: '',
    notionDatabaseId: '',
  });

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
          <label className="block text-sm font-semibold text-gray-700">
            <Key className="inline-block w-4 h-4 mr-2 align-middle" />
            Gemini API Key
          </label>
          <input
            type="password"
            value={settings.geminiApiKey}
            onChange={(e) => handleInputChange(e, 'geminiApiKey')}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your Gemini API key"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            <Key className="inline-block w-4 h-4 mr-2 align-middle" />
            Notion Integration Token
          </label>
          <input
            type="password"
            value={settings.notionToken}
            onChange={(e) => handleInputChange(e, 'notionToken')}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your Notion integration token"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            <Database className="inline-block w-4 h-4 mr-2 align-middle" />
            Notion Database ID
          </label>
          <input
            type="text"
            value={settings.notionDatabaseId}
            onChange={(e) => handleInputChange(e, 'notionDatabaseId')}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your Notion database ID"
          />
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


