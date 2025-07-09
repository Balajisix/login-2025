'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events'); 
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add actual logout logic here
    alert("Logged out!");
  };

  return (
    <main className="min-h-screen bg-[#1a1a2e] text-white px-4 sm:px-6 py-8">
      <nav className="w-full flex justify-between items-center bg-[#0f0f1c] p-4 rounded-xl mb-8 shadow-lg">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="font-bold text-lg">PSG College of Technology</h1>
        </div>

        <h1 className="text-xl font-bold text-blue-400">L<span className="text-purple-400">o</span>g<span className="text-pink-400">i</span>n</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 text-white focus:outline-none"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zM4.2 20.8c0-2.6 5.6-4 7.8-4s7.8 1.4 7.8 4v.4H4.2v-.4z"/>
            </svg>
            <span>User Name</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md z-50">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <h2 className="text-3xl font-bold mb-6">Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 justify-center">
        {events.map((event) => (
        <Link href={`/dashboard/${event.id}`} key={event.id}>
          <div
            className="w-[350px] h-[350px] bg-gradient-to-br from-purple-500 to-blue-400 rounded-xl shadow-lg text-center flex flex-col justify-between p-4 hover:scale-105 transition-transform duration-300"
          >
            <div className="w-full h-[65%]">
              <Image
                src={event.image}
                alt={event.name}
                width={350}
                height={228}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-lg font-semibold text-white">{event.name}</h3>
              <p className="text-sm text-white">{event.tagline}</p>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </main>
  );
}
