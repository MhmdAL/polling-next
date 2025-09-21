'use client';

import { getPoll, getPollResults, Poll, PollOption, PollResultsResponse } from '@/lib/PollService';
import { userStorage } from '@/lib/userStorage';
import { useEffect, useState } from 'react';

export default function PollResults({ pollId }: {pollId: number}) {
  const [pollResults, setPollResults] = useState<PollResultsResponse | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copyToast, setCopyToast] = useState('');
  const [hasCreatedPolls, setHasCreatedPolls] = useState(false);

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyToast(`${label} copied to clipboard!`);
      setTimeout(() => setCopyToast(''), 2000);
    }).catch(() => {
      setCopyToast('Failed to copy to clipboard');
      setTimeout(() => setCopyToast(''), 2000);
    });
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts
    
    const fetchPoll = async (isInitial = false) => {
      try {
        const response = await getPollResults(pollId);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setPollResults(response);
        }
      } catch (error: any) {
        if (isMounted) {
          showMessage('Failed to load poll results.');
        }
      } finally {
        if (isInitial && isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    // Initial fetch
    fetchPoll(true);

    // Auto-refresh results every 10 seconds (reduced frequency)
    const interval = setInterval(() => {
      if (isMounted) {
        fetchPoll(false);
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pollId]);

  useEffect(() => {
    setHasCreatedPolls(userStorage.hasCreatedPolls());
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading poll results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pollResults?.poll) {
    return (
      <div className="min-h-screen py-8" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Poll not found</h3>
              <p className="text-gray-600">The poll you're looking for doesn't exist or has been removed.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalVotes = pollResults?.poll.options.reduce((total, option) => total + (option.votes || 0), 0);
  const totalSubmissions = pollResults?.submissionCount || 0;

  return (
    <div className="min-h-screen py-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pollResults?.poll.question}</h1>
            <p className="text-gray-600">Poll Results</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                {totalSubmissions} submissions
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {totalVotes} total votes
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 mb-8">
            {pollResults?.poll.options.map((option, index) => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              const isWinning = option.votes > 0 && option.votes === Math.max(...pollResults?.poll.options.map(o => o.votes));
              
              return (
                <div
                  key={option.id || index}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isWinning && totalVotes > 0
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{option.name}</h3>
                    <div className="flex items-center gap-2">
                      {isWinning && totalVotes > 0 && (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className="text-sm font-medium text-gray-600">
                        {option.votes} votes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isWinning && totalVotes > 0 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Share Section */}
          <div className="border-t pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this poll</h3>
              <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-4 border">
                <code className="text-sm font-mono text-gray-700 flex-1 min-w-0 truncate">
                  {`${window.location.origin}/poll/submit/${pollResults?.poll.id}`}
                </code>
                <button
                  onClick={() => copyToClipboard(`${window.location.origin}/poll/submit/${pollResults?.poll.id}`, 'Poll link')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors whitespace-nowrap"
                  title="Copy poll link"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {hasCreatedPolls && (
            <div className="mt-8 pt-6 border-t text-center">
              <button
                onClick={() => window.location.href = '/poll'}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                ← Back to My Polls
              </button>
            </div>
          )}

          {/* Actions */}

          {/* Error Message */}
          {message && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-center font-medium text-red-800">{message}</p>
            </div>
          )}
        </div>
      </div>

      {/* Copy Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {copyToast}
          </div>
        </div>
      )}
    </div>
  );
}
