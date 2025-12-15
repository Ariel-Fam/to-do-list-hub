// app/components/CompletedTodoList.js
'use client';

import { Circle, Trash2, X } from 'lucide-react';

export default function CompletedTodoList({ completedTodos, onUndoComplete, onDelete, isOpen, setIsOpen }) {
    return (
        <aside className={`lg:col-span-1 bg-slate-800/50 p-6 rounded-xl border border-slate-700 lg:block ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-300">Completed ({completedTodos.length})</h2>
                <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                    <X size={40} />
                </button>
            </div>
            {completedTodos.length > 0 ? (
                <ul className="space-y-3">
                    {[...completedTodos]
                        .sort((a, b) => (new Date(b.completedAt || b._creationTime) - new Date(a.completedAt || a._creationTime)))
                        .map((todo) => (
                        <li
                            key={todo._id}
                            className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between opacity-60"
                        >
                            <span className="line-through text-slate-400">{todo.text}</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onUndoComplete(todo)}
                                    title="Mark as incomplete"
                                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                >
                                    <Circle size={20} />
                                </button>
                                <button
                                    onClick={() => onDelete(todo)}
                                    title="Delete permanently"
                                    className="text-red-600 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10 px-4">
                    <p className="text-slate-500">Completed tasks will appear here.</p>
                </div>
            )}
        </aside>
    );
}
