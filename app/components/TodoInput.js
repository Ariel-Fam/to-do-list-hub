// app/components/TodoInput.js
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoInput({ onAddTodo, }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onAddTodo(inputValue);
    setInputValue('');
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="flex-grow bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={20} className="mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

    </>
  );
}
