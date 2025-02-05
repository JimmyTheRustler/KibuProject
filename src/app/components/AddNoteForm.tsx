'use client';
import { useState } from 'react';

//interface to ensure we get memberId, this is to know who's notes we're working with
interface AddNoteFormProps {
  memberId: string;
}

export default function AddNoteForm({ memberId }: AddNoteFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    //check incase we have empty note, return if so
    e.preventDefault();
    if (!text.trim()) return;
  
    //set "setIsSubmitting" lock to true and try post request to API with note
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          text: text.trim()
        }),
      });

      if (!response.ok) throw new Error('Failed to add note');
      
      setText('');
      // Refresh the page to show the new note
      window.location.reload();
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col space-y-2">
        {/* add note textbox */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new note..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500/50 focus:border-transparent"
          style={{ backgroundColor: '#086c94' }}
          rows={3}
        />
        {/* Add note save button */}
        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className="px-4 py-2 bg-sky-500/50 text-white rounded-md hover:bg-sky-600/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </form>
  );
} 