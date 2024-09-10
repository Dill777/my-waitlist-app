"use client";

import React, { useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';  // Импорт иконки X (Twitter)

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Ваша функция handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setMessage('There was an error submitting the form');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 ordinalsTxt">
          Join to the waitlist
        </h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Be the first to know when we launch. Join the waitlist today and secure your spot!
        </p>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black p-4 rounded-lg font-bold hover:bg-gray-200 transition"
          >
            Join
          </button>
        </div>
      </form>

      {message && <p className="mt-6 text-center text-green-500">{message}</p>}

      <footer className="absolute bottom-4 text-gray-600 text-center">
        <p>&copy; 2024 Mosaik. All rights reserved.</p>

        <div className="flex justify-center mt-4">
          <a
            href="https://x.com/mosaikbtc" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FaXTwitter className="w-8 h-8" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
