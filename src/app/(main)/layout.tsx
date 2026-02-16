import Navbar from '@/components/Navbar';
import React from 'react'

function Mainlayout({
    children,
    }: Readonly<{
    children: React.ReactNode
    }>) {
  return (
    <div className="h-screen flex flex-col bg-navy font-sans overflow-hidden px-12 md:px-24">
      <Navbar />
      <main className="flex-1 overflow-y-auto py-8 px-12 md:px-24">{children}</main>
    </div>
  );
}

export default Mainlayout