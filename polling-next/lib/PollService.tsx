// lib/api.ts

import { userStorage } from "./userStorage";
import { config } from "./config";

const API_URL = config.apiUrl;

export interface Poll {
    id: string;
    question: string;
    maxResponseOptions: string;
    options: PollOption[];
    submissionCount: number;
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

export interface PollResultsResponse {
    poll: Poll;
    submissionCount: number;
}

export async function createPoll(data: CreatePollRequest) {
    const response = await fetch(`${API_URL}/createPoll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...data, createdBy: userStorage.getUserId()}),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function getPoll(pollId: number) : Promise<PollResponse> {
    const response = await fetch(`${API_URL}/getPoll/${pollId}/${userStorage.getUserId()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function getPollResults(pollId: number) : Promise<PollResultsResponse> {
    const response = await fetch(`${API_URL}/getPollResults/${pollId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    return await response.json();
}

export async function getPolls() : Promise<Poll[]> {
    const response = await fetch(`${API_URL}/getPolls/${userStorage.getUserId()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('Failed to create poll');
    }
  
    return await response.json();
}

export async function submitPoll(data: any) {
    const response = await fetch(`${API_URL}/submitPoll/${userStorage.getUserId()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit poll');
    }
  
    return await response.json();
}