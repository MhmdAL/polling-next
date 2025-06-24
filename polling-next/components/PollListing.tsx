'use client';

import { createPoll, getPoll, getPolls, Poll, PollOption, submitPoll } from '@/lib/PollService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PollListing() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [message, setMessage] = useState(''); 

  const setDefaultValues = () => {
    setPolls([]);
  }

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
        showMessage('Failed to load poll.');
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


  // const handleSubmitPoll = async () => {
  //   if (!question || options.some(opt => !opt.name.trim())) {
  //     return;
  //   }

  //   try {
  //     const response = await submitPoll({
  //       pollId: pollId,
  //       pollOptionIds: selectedOptions.map(x => x.id)
  //     });
  //     console.log('Created poll:', response);

  //     setViewMode(true)
  //     setReloadTrigger(!reloadTrigger);

  //     showMessage(`Poll submitted successfully!`)
  //   } catch (error: any) {
  //     console.error(error);
  //     showMessage('Failed to submit poll.');
  //   }
  // };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Poll:</h1>
      <div className="space-y-3">
        {polls.map((item, index) => (
          <div
            key={index}
            onClick={(e) => navigateToPollSubmission(item)}
            className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
          >
            {/* <div className="flex items-center space-x-3" > */}
              <label className="text-gray-800 cursor-pointer">{item.question}</label>
            {/* </div> */}
          </div>
        ))}
      </div>

        {message && (
        <div className="mt-4 text-center text-sm font-semibold">
          <p className="text-green-500">{message}</p>
        </div>
      )}
    </div>
  );
}