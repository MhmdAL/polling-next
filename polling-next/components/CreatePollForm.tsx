'use client';

import { createPoll, PollOption } from '@/lib/PollService';
import { useState } from 'react';

export default function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [responseCount, setResponseCount] = useState('1');
  const [option, setOption] = useState<PollOption>({name: '', votes: 0, id: '0', isChecked: false});
  const [options, setOptions] = useState<PollOption[]>([]);
  const [message, setMessage] = useState(''); 

  const setDefaultValues = () => {
    setQuestion('');
    setOption({name: '', votes: 0, id: '0', isChecked: false});
    setResponseCount('1');
    setOptions([]);
  }

  const showMessage = (message: string) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 3000);
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

    try {
      const response = await createPoll({
        question,
        maxResponseOptions: responseCount,
        options: options,
      });
      console.log('Created poll:', response);

      setDefaultValues();

      showMessage(`Poll with id ${response} created successfully!`)
    } catch (error: any) {
      console.error(error);
      showMessage('Failed to create poll.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Item</h1>
      <div className="space-y-2">
        <label>Question</label>
        <input
          className="w-full p-2 border rounded"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label>Response Count</label>
        <input
          className="w-full p-2 border rounded"
          placeholder="Response Count"
          type='number'
          min={1}
          value={responseCount}
          onChange={(e) => setResponseCount(e.target.value)}
        />

        <label>Options</label>
        <input
          className="w-full p-2 border rounded"
          placeholder="Add Option"
          value={option.name}
          onChange={(e) => setOption({...option, name: e.target.value})}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // optional: prevent form submission or default behavior
              handleAddItem();
            }
          }}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleAddItem}
        >
          Add to List
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {options.map((item, index) => (
          <li key={index} className="p-2 bg-gray-100">
            {index+1} - {item.name}
          </li>
        ))}
      </ul>

      <br></br>

      <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleCreatePoll}
        >
          Create Poll
        </button>

        {message && (
        <div className="mt-4 text-center text-sm font-semibold">
          <p className="text-green-500">{message}</p>
        </div>
      )}
    </div>
  );
}