// lib/userStorage.ts

export const userStorage = {
  getUserId(): string {
    if (typeof window === 'undefined') return '';
    
    let userId = localStorage.getItem('poll_user_id');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('poll_user_id', userId);
    }
    return userId;
  },

  hasCreatedPolls(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('hasCreatedPolls') === 'true';
  },

  setHasCreatedPolls(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('hasCreatedPolls', 'true');
  },

  clearHasCreatedPolls(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('hasCreatedPolls');
  }
};
