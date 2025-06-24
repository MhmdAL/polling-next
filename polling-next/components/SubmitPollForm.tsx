'use client';

import { createPoll, getPoll, Poll, PollOption, submitPoll } from '@/lib/PollService';
import { useEffect, useState } from 'react';

export default function SubmitPollForm({ pollId }: {pollId: number}) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>([{ id: '1', votes: 0, name: 'potato', isChecked: false}]);
  const [maxResponseOptions, setMaxResponseOptions] = useState('1');
  const [viewMode, setViewMode] = useState(false);
  const [message, setMessage] = useState(''); 
  const [reloadTrigger, setReloadTrigger] = useState(false); 

  const setDefaultValues = () => {
    setQuestion('');
    setMaxResponseOptions('');
    setOptions([]);
  }

  const setPoll = (poll: Poll) => {
    setQuestion(poll.question)
    setOptions(poll.options)
    setMaxResponseOptions(poll.maxResponseOptions)
  };

  const showMessage = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPoll(
          pollId
        );

        setPoll(response.poll);
        setViewMode(response.alreadySubmitted);

        response.poll.options.forEach(x => {
          if(response.selectedOptions.indexOf(x.id) !== -1) {
            x.isChecked = true;
          }
          else {
            x.isChecked = false;
          }
        })

      } catch (error: any) {
        showMessage('Failed to load poll.');
      }
    };
  
    fetchPoll();
  }, [pollId, reloadTrigger])

  const handleSubmitPoll = async () => {
    if (!question || options.some(opt => !opt.name.trim())) {
      return;
    }

    try {
      const response = await submitPoll({
        pollId: pollId,
        pollOptionIds: selectedOptions.map(x => x.id)
      });
      console.log('Created poll:', response);

      setViewMode(true)
      setReloadTrigger(!reloadTrigger);

      showMessage(`Poll submitted successfully!`)
    } catch (error: any) {
      console.error(error);
      showMessage('Failed to submit poll.');
    }
  };

  const handleCheckboxChange = (index: number) => {
    setOptions(prevOptions => {
      const selectedCount = prevOptions.filter(opt => opt.isChecked).length;
      const isCurrentlyChecked = prevOptions[index].isChecked;

      // Allow unchecking or checking if under limit
      if (!isCurrentlyChecked && selectedCount >= Number(maxResponseOptions)) {
        return prevOptions; // Don't allow checking more
      }

      // Toggle the selected item
      return prevOptions.map((opt, i) =>
        i === index ? { ...opt, isChecked: !opt.isChecked } : opt
      );
    });
  };

  const selectedOptions = options.filter(opt => opt.isChecked);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{question}</h1>
      <div className="space-y-3">
        {options.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.isChecked}
                disabled={viewMode || !item.isChecked && selectedOptions.length >= Number(maxResponseOptions)}
                onChange={() => handleCheckboxChange(index)}
                className="h-5 w-5 text-blue-600"
              />
              <label className="text-gray-800">{item.name}</label>
            </div>
            <span className="text-sm text-gray-500">Votes: {item.votes ?? 0}</span>
          </div>
        ))}
      </div>

      <br></br>

      <button
          className={`w-full py-2 rounded 
            ${viewMode 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          onClick={handleSubmitPoll}
          disabled={viewMode}
        > 
          Submit
        </button>

        {message && (
        <div className="mt-4 text-center text-sm font-semibold">
          <p className="text-green-500">{message}</p>
        </div>
      )}
    </div>
  );
}