'use client';

import { getPoll, Poll, PollOption, submitPoll } from '@/lib/PollService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SubmitPollForm({ pollId }: {pollId: number}) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [options, setOptions] = useState<PollOption[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 


  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPoll(pollId);
        
        // If user already submitted, redirect to results (keep loading state until redirect)
        if (response.alreadySubmitted) {
          router.push(`/poll/results/${pollId}`);
          return; // Don't set loading to false, let redirect happen
        }

        setPoll(response.poll);
        setOptions(response.poll.options.map(option => ({ ...option, isChecked: false })));
        setIsLoading(false); // Only set loading to false if we're staying on this page
      } catch (error: any) {
        showMessage('Failed to load poll.');
        setIsLoading(false); // Set loading to false on error
      }
    };
  
    fetchPoll();
  }, [pollId, router])

  const handleSubmitPoll = async () => {
    if (selectedOptions.length === 0) {
      showMessage('Please select at least one option.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitPoll({
        pollId: pollId,
        pollOptionIds: selectedOptions.map(x => x.id)
      });
      
      // Redirect to results page after successful submission
      router.push(`/poll/results/${pollId}`);
    } catch (error: any) {
      console.error(error);
      showMessage('Failed to submit poll. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (index: number) => {
    if (!poll) return;
    
    setOptions(prevOptions => {
      const selectedCount = prevOptions.filter(opt => opt.isChecked).length;
      const isCurrentlyChecked = prevOptions[index].isChecked;

      // Allow unchecking or checking if under limit
      if (!isCurrentlyChecked && selectedCount >= Number(poll.maxResponseOptions)) {
        return prevOptions; // Don't allow checking more
      }

      // Toggle the selected item
      return prevOptions.map((opt, i) =>
        i === index ? { ...opt, isChecked: !opt.isChecked } : opt
      );
    });
  };

  const selectedOptions = options.filter(opt => opt.isChecked);

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
              <p className="text-gray-600">Loading poll...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!poll) {
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
              <p className="text-gray-600 mb-6">The poll you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => window.location.href = '/poll'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                View All Polls
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{poll.question}</h1>
            <p className="text-gray-600">
              Select up to {poll.maxResponseOptions} option{Number(poll.maxResponseOptions) !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {options.map((option, index) => {
              const isDisabled = !option.isChecked && selectedOptions.length >= Number(poll.maxResponseOptions);
              
              return (
                <div
                  key={option.id || index}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    option.isChecked
                      ? 'border-blue-500 bg-blue-50'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => !isDisabled && handleCheckboxChange(index)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={option.isChecked}
                      disabled={isDisabled}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-900 font-medium cursor-pointer flex-1">
                      {option.name}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="border-t pt-6">
            <button
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleSubmitPoll}
              disabled={selectedOptions.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                `Submit Vote${selectedOptions.length > 1 ? 's' : ''}`
              )}
            </button>
            
            {selectedOptions.length === 0 && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Please select at least one option to submit your vote
              </p>
            )}
            
            {selectedOptions.length > 0 && (
              <p className="text-sm text-green-600 text-center mt-2">
                {selectedOptions.length} option{selectedOptions.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t text-center">
            <button
              onClick={() => router.push(`/poll/results/${poll.id}`)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              View Current Results
            </button>
          </div>

          {/* Error Message */}
          {message && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-center font-medium text-red-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}