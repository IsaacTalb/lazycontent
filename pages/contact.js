// contact.js
import Link from 'next/link';
import Image from 'next/image';
import { Cloud, Sparkles, Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="rounded-lg bg-white shadow-md flex items-center justify-center w-10 h-10 overflow-hidden">
                  <img src="/dklogo.jpg" alt="LazyContent Logo" className="w-full h-full object-cover" />
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
                <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200">
                  About
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg transition-all duration-200">
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about LazyContent? Need help getting started? We&apos;d love to hear from you!
            Our team is here to help you streamline your content creation process.
          </p>
        </div>

        {/* Contact Methods */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Support</h3>
            <p className="text-gray-600 mb-4">Get help with technical issues or billing questions</p>
            <p className="text-blue-600 font-semibold">support@duckcloud.com</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-4">Quick responses for urgent questions</p>
            <p className="text-purple-600 font-semibold">Available 9AM-5PM EST</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <p className="text-green-600 font-semibold">+1 (555) 123-4567</p>
          </div>
        </div> */}

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
          </div>
          
          <iframe
            src="https://form.typeform.com/to/NrsxNqkV"
            title="Contact Form"
            className="w-full h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-xl border-2 border-gray-200"
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does LazyContent work?</h3>
              <p className="text-gray-600">Simply paste any blog post URL, and our AI will analyze the content and generate tailored social media posts for multiple platforms, complete with captions, hashtags, and video scripts.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Which platforms are supported?</h3>
              <p className="text-gray-600">We support Facebook, LinkedIn, Threads (X), YouTube, Instagram, and we&apos;re constantly adding more platforms based on user feedback.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Do I need a Notion account?</h3>
              <p className="text-gray-600">Yes, you&apos;ll need a Notion account to save your generated content. We automatically organize everything in your Notion database for easy access and management.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! You can process up to 5 blog posts for free to test our service. No credit card required.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Creating?</h3>
            <p className="text-blue-100 mb-6 text-lg">
            Don&apos;t let content creation slow you down. Try LazyContent today and see the difference AI can make.
          </p>
          <Link href="/">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto">
              <span>Try LazyContent Free</span>
              <Send className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="inline-flex items-center justify-center bg-white rounded-lg shadow-md w-8 h-8 mr-2">
              <Image src="/dklogo.jpg" alt="DuckCloud Logo" width={24} height={24} className="object-contain" />
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