'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

export default function Comments() {
  const pathname = usePathname();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments-${pathname}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const comment: Comment = {
      id: Date.now().toString(),
      ...newComment,
      date: new Date().toLocaleString('tr-TR')
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${pathname}`, JSON.stringify(updatedComments));
    
    setNewComment({
      name: '',
      email: '',
      content: ''
    });
  };

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Yorumlar ({comments.length})</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="İsminiz"
            value={newComment.name}
            onChange={(e) => setNewComment({...newComment, name: e.target.value})}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={newComment.email}
            onChange={(e) => setNewComment({...newComment, email: e.target.value})}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <textarea
          placeholder="Yorumunuz..."
          value={newComment.content}
          onChange={(e) => setNewComment({...newComment, content: e.target.value})}
          className="w-full p-2 border rounded mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Yorum Yap
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{comment.name}</div>
              <div className="text-sm text-gray-500">{comment.date}</div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 