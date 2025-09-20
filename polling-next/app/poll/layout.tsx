'use client';

import HomeButton from '@/components/HomeButton';
import PollListing from '@/components/PollListing';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            {children}
        </div>
    );
  }
  