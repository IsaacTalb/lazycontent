// about.js
import Link from 'next/link';
import Image from 'next/image';
import { Cloud, Globe, Sparkles, Users, Zap, Database, Clock, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="rounded-lg bg-white shadow-md flex items-center justify-center w-10 h-10 overflow-hidden">
                                      
                    <Image
                      src="/dklogo.jpg"
                      alt="LazyContent Logo"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    LazyContent
                  </h1>
                  <p className="text-sm text-gray-600">by DuckCloud</p>
                </div>
              </div>
            </Link>

            <nav className="flex items-center space-x-4">
              <Link href="/about">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-200">
                  About
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition-all duration-200">
                  Contact
                </button>
              </Link>
            </nav>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>v2.0 - More features coming soon!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
                        <div className="bg-white shadow-md w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 overflow-hidden">
                          
              <Image
                src="/dklogo.jpg"
                alt="LazyContent Logo"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About LazyContent
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming the way content creators work with AI-powered automation. 
            LazyContent bridges the gap between brilliant ideas and engaging social media presence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            LazyContent empowers content creators, marketers, and businesses to transform any blog post URL into 
            engaging social media content across multiple platforms. Using advanced Google Gemini AI, we automatically 
            generate tailored captions, hashtags, and even video scripts, then seamlessly save everything to your 
            Notion workspace. Our goal is to eliminate repetitive content workflows and boost productivity for 
            modern digital creators.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
            <p className="text-gray-600">Advanced Google Gemini AI generates contextually relevant content for each platform&apos;s unique requirements.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform</h3>
            <p className="text-gray-600">Generate content for Facebook, LinkedIn, Threads, YouTube, Instagram, and more with platform-specific optimization.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Notion Integration</h3>
            <p className="text-gray-600">Automatically save all generated content to your Notion database for easy organization and future reference.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving</h3>
            <p className="text-gray-600">What used to take hours now takes minutes. Focus on creating great content, not reformatting it.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Creator-Focused</h3>
            <p className="text-gray-600">Built by creators, for creators. We understand the daily challenges of content production.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Evolving</h3>
            <p className="text-gray-600">Regular updates and new features based on user feedback and the latest AI advancements.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Content Workflow?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of creators who have already streamlined their social media presence with LazyContent.
          </p>
          <Link href="/">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="inline-flex items-center justify-center bg-white rounded-lg shadow-md w-8 h-8 mr-2">
              
              <Image
                src="/dklogo.jpg"
                alt="LazyContent Logo"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </span>
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