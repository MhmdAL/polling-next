'use client';

import { createPoll, getPoll, getPolls, Poll, PollOption, submitPoll } from '@/lib/PollService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PollListing() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copyToast, setCopyToast] = useState(''); 


  const showMessage = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getPolls();
        setPolls(response);
      } catch (error: any) {
        showMessage('Failed to load polls.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolls();

    const interval = setInterval(() => {
      fetchPolls();
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup the interval when the component unmounts or when dependencies change
    return () => clearInterval(interval);

  }, [])

  const router = useRouter();

  const navigateToPollSubmission = (item: Poll) => {
    router.push(`/poll/submit/${item.id}`); // Navigate to submit page with poll ID
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyToast(`${label} copied to clipboard!`);
      setTimeout(() => setCopyToast(''), 2000);
    }).catch(() => {
      setCopyToast('Failed to copy to clipboard');
      setTimeout(() => setCopyToast(''), 2000);
    });
  };



  return (
    <div className="min-h-screen py-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Polls</h1>
            <p className="text-gray-600">Manage and view your created polls</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading polls...</p>
            </div>
          ) : polls.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No polls created yet</h3>
              <p className="text-gray-600 mb-6">You haven't created any polls yet. Start by creating your first poll!</p>
              <button
                onClick={() => window.location.href = '/poll/create'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Create Your First Poll
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {polls.map((poll, index) => (
                <div
                  key={poll.id || index}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {poll.question}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {poll.options?.length || 0} options
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          {poll.submissionCount || 0} submissions
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/poll/results/${poll.id}`)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm"
                    >
                      View Results
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = `${window.location.origin}/poll/submit/${poll.id}`;
                        copyToClipboard(url, 'Share link');
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium text-sm"
                      title="Copy share link"
                    >
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {message && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-center font-medium text-red-800">{message}</p>
            </div>
          )}

          {/* Create New Poll Button */}
          {polls.length > 0 && (
            <div className="mt-8 pt-6 border-t text-center">
              <button
                onClick={() => window.location.href = '/poll/create'}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Create Another Poll
              </button>
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