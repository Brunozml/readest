'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useTranslation } from '@/hooks/useTranslation';
import ChatMessageItem from './ChatMessageItem';

const ChatView: React.FC = () => {
  const _ = useTranslation();
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat();

  const handleDeleteMessage = (messageId: string) => {
    // If your chat hook supports message deletion, implement it here
    console.log('Delete message:', messageId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className='flex flex-col h-full py-2'>
      <div className='flex-1 overflow-y-auto px-2 pb-4'>
        <ul className='space-y-2'>
          {messages.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              {_('Start a conversation with the AI assistant')}
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessageItem 
                key={message.id} 
                message={{
                  ...message,
                  createdAt: Date.now() // You might want to store actual timestamps
                }}
                onDeleteMessage={handleDeleteMessage}
              />
            ))
          )}
        </ul>
      </div>
      
      <div className='border-t border-base-300/50 p-2 bg-base-200/20'>
        <form onSubmit={handleSendMessage} className='flex space-x-2'>
          <input
            type='text'
            className='flex-1 input input-bordered input-sm'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={_('Type your message...')}
            disabled={isLoading}
          />
          <button 
            type='submit' 
            className='btn btn-primary btn-sm'
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? _('Thinking...') : _('Send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;