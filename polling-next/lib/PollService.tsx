// lib/api.ts

export interface Poll {
    id: string;
    question: string;
    maxResponseOptions: string;
    options: PollOption[];  
}

export interface PollOption {
    id: string;
    isChecked: boolean;
    name: string;
    votes: number;  
}

export interface CreatePollRequest {
    question: string;
    maxResponseOptions: string;
    options: PollOption[];
}

export interface PollResponse {
    alreadySubmitted: boolean;
    selectedOptions: string[];
    poll: Poll;
}

export async function createPoll(data: CreatePollRequest) {
    const response = await fetch('http://localhost:5194/createPoll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function getPoll(pollId: number) : Promise<PollResponse> {
    const response = await fetch(`http://localhost:5194/getPoll/${pollId}/${sessionStorage.getItem('pollUserId')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function getPolls() : Promise<Poll[]> {
    const response = await fetch(`http://localhost:5194/getPolls`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function submitPoll(data: any) {
    const response = await fetch(`http://localhost:5194/submitPoll/${sessionStorage.getItem('pollUserId')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit poll');
    }
  
    return await response.json();
}