
'use client';

import { userStorage } from '@/lib/userStorage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasCreatedPolls, setHasCreatedPolls] = useState(false);

  useEffect(() => {
    setHasCreatedPolls(userStorage.hasCreatedPolls());
  }, []);
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo/Title */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-4">
                📊 PollApp
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Create beautiful polls, collect responses, and view real-time results. 
                Simple, fast, and completely free.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="/poll/create"
                className="px-8 py-4 bg-white text-purple-700 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-white/20 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {hasCreatedPolls ? 'Create Another Poll' : 'Create Your First Poll'}
              </a>
              {hasCreatedPolls && (
                <a
                  href="/poll"
                  className="px-8 py-4 bg-white/10 text-white border-2 border-white/20 rounded-lg hover:bg-white/20 focus:ring-4 focus:ring-white/20 transition-all duration-200 font-semibold text-lg backdrop-blur-sm"
                >
                  View My Polls
                </a>
              )}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-white/80">Create polls in seconds with our intuitive interface</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Results</h3>
                <p className="text-white/80">Watch responses come in live with beautiful visualizations</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy Sharing</h3>
                <p className="text-white/80">Share your polls with a simple link - no accounts required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How it works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Create</h3>
              <p className="text-white/80">Write your question and add options</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Share</h3>
              <p className="text-white/80">Copy the link and share with your audience</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analyze</h3>
              <p className="text-white/80">View results and insights in real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Made with ❤️ for better decision making
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
