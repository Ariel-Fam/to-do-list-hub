// app/components/TodoList.js
'use client';

import { CheckCircle, Trash2 } from 'lucide-react';

export default function TodoList({ todos, onToggleComplete, onDelete, loadingAiTaskId, isAiLoading }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-300 border-b-2 border-slate-700 pb-2">
        Active Tasks ({todos.length})
      </h2>

      {isAiLoading && !loadingAiTaskId && <p className="text-center text-slate-400">✨ Gemini is thinking...</p>}

      {todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-slate-800 rounded-lg p-4 flex items-center justify-between shadow-md transition-all duration-300 hover:shadow-lg hover:bg-slate-700/50"
            >
              <span className="flex-grow text-slate-200">{todo.text}</span>
              <div className="flex items-center gap-3">
                {loadingAiTaskId === todo._id ? (
                  <span className="text-sm text-slate-400">Breaking down...</span>
                ) : (
                  <>

                    <button
                      onClick={() => onToggleComplete(todo)}
                      title="Mark as complete"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      <CheckCircle size={22} />
                    </button>
                    <button
                      onClick={() => onDelete(todo)}
                      title="Delete task"
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 px-4 bg-slate-800 rounded-lg">
          <p className="text-slate-400">All tasks are completed.</p>
        </div>
      )}
    </div>
  );
}
