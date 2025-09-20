'use client';

import { createPoll, PollOption } from '@/lib/PollService';
import { userStorage } from '@/lib/userStorage';
import { useState } from 'react';

export default function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [responseCount, setResponseCount] = useState('1');
  const [option, setOption] = useState<PollOption>({name: '', votes: 0, id: '0', isChecked: false});
  const [options, setOptions] = useState<PollOption[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [createdPollId, setCreatedPollId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copyToast, setCopyToast] = useState(''); 

  const setDefaultValues = () => {
    setQuestion('');
    setOption({name: '', votes: 0, id: '0', isChecked: false});
    setResponseCount('1');
    setOptions([]);
    setCreatedPollId(null);
    setIsCreating(false);
  }

  const showMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setMessage(message);
    setMessageType(type);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyToast(`${label} copied to clipboard!`);
      setTimeout(() => setCopyToast(''), 2000);
    }).catch(() => {
      setCopyToast('Failed to copy to clipboard');
      setTimeout(() => setCopyToast(''), 2000);
    });
  }

  const handleAddItem = () => {
    if (!option || !option.name.trim()) return;

    setOptions([...options,  option ]);

    setOption({name: '', votes: 0, id: '0', isChecked: false})
  };

  const handleCreatePoll = async () => {
    if (!question || options.some(opt => !opt.name.trim())) {
      return;
    }

    setIsCreating(true);
    
    try {
      const response = await createPoll({
        question,
        maxResponseOptions: responseCount,
        options: options,
      });
      console.log('Created poll:', response);

      setCreatedPollId(response);
      setQuestion('');
      setOption({name: '', votes: 0, id: '0', isChecked: false});
      setResponseCount('1');
      setOptions([]);
      
      // Mark that user has created at least one poll
      userStorage.setHasCreatedPolls();
    } catch (error: any) {
      console.error(error);
      showMessage('Failed to create poll. Please try again.', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen py-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create a New Poll</h1>
          
          <div className="space-y-6">
            {/* Question Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poll Question *
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="What would you like to ask?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {/* Response Count Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Selected Options
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="1"
                type='number'
                min={1}
                value={responseCount}
                onChange={(e) => setResponseCount(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">How many options can each user select?</p>
            </div>

            {/* Add Options Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poll Options
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter an option..."
                  value={option.name}
                  onChange={(e) => setOption({...option, name: e.target.value})}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem();
                    }
                  }}
                />
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  onClick={handleAddItem}
                  disabled={!option.name.trim()}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Options List */}
            {options.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Poll Options ({options.length})</h3>
                <div className="space-y-2">
                  {options.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <span className="text-gray-900">
                        <span className="text-gray-500 font-medium">{index + 1}.</span> {item.name}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 p-1 rounded"
                        onClick={() => setOptions(options.filter((_, i) => i !== index))}
                        title="Remove option"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {options.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No options added yet. Add at least two options to create your poll.</p>
              </div>
            )}
          </div>

          {/* Create Poll Button */}
          <div className="mt-8 pt-6 border-t">
            <button
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleCreatePoll}
              disabled={!question.trim() || options.length < 2 || isCreating}
            >
              {isCreating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Poll...
                </>
              ) : (
                'Create Poll'
              )}
            </button>
            {(!question.trim() || options.length < 2) && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Please add a question and at least 2 options
              </p>
            )}
          </div>

          {/* Error Message */}
          {message && messageType === 'error' && (
            <div className="mt-4 p-4 rounded-lg border bg-red-50 border-red-200">
              <p className="text-center font-medium text-red-800">
                {message}
              </p>
            </div>
          )}

          {/* Poll Created Success with URL */}
          {createdPollId && (
            <div className="mt-4 p-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-4">🎉 Poll Created Successfully!</h3>
                
                <div>
                  <p className="text-sm text-gray-600 mb-3">Share this URL with others to collect responses:</p>
                  <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-4 border shadow-sm">
                    <code className="text-sm font-mono text-gray-700 flex-1 min-w-0 truncate">
                      {`${window.location.origin}/poll/submit/${createdPollId}`}
                    </code>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/poll/submit/${createdPollId}`, 'Poll URL')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors whitespace-nowrap"
                      title="Copy Poll URL"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 justify-center">
                  <button
                    onClick={() => window.location.href = `/poll/results/${createdPollId}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Show Responses
                  </button>
                  <button
                    onClick={() => setCreatedPollId(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Create Another Poll
                  </button>
                </div>
              </div>
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