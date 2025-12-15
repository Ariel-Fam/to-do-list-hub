// app/components/TodoInput.js
'use client';

import { useState } from 'react';
import { Plus, Sparkles, ClipboardPaste } from 'lucide-react';

export default function TodoInput({ onAddTodo, onAddMultipleTodos, isAiLoading, setIsAiLoading, callGemini }) {
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

  const handleSuggestTasks = async () => {
    setIsAiLoading(true);
    const prompt = "Suggest three simple, actionable, and distinct tasks for a to-do list. Format them as a simple list, with each task on a new line. For example:\n- Task 1\n- Task 2\n- Task 3";
    const suggestionsText = await callGemini(prompt);

    if (suggestionsText) {
      const newTasks = suggestionsText.split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean);
      onAddMultipleTodos(newTasks);
    }
    setIsAiLoading(false);
  };

  const handleSmartPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      setIsAiLoading(true);
      const prompt = `From the following text, extract any actionable tasks and list them clearly, one per line. If no tasks are found, respond with "No tasks found."\n\nText: "${text}"`;
      const tasksText = await callGemini(prompt);

      if (tasksText && tasksText.toLowerCase() !== "no tasks found.") {
        const newTasks = tasksText.split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean);
        onAddMultipleTodos(newTasks);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    } finally {
      setIsAiLoading(false);
    }
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
      {/* <div className="flex gap-2 mb-8">
        <button
          onClick={handleSmartPaste}
          disabled={isAiLoading}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ClipboardPaste size={18} className="mr-2" />
          ✨ Smart Paste
        </button>
        <button
          onClick={handleSuggestTasks}
          disabled={isAiLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={18} className="mr-2" />
          ✨ Suggest Tasks
        </button>
      </div> */}
    </>
  );
}
