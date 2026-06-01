import { useRouter } from 'next/navigation';
import React from 'react';

const HomeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/poll'); // Redirect to /poll
  };

  return (
    <button 
      className="fixed top-4 left-4 p-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 cursor-pointer"
      onClick={handleClick}
    >
      Home
    </button>
  );
};

export default HomeButton;