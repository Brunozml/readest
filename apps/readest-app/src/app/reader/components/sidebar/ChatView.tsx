'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';

const ChatView: React.FC = () => {
  const [input, setInput] = useState(''); // State for user input
  const { messages, sendMessage } = useChat(); // Hook to manage chat state

  return (
    <div className='stretch mx-auto flex w-full max-w-md flex-col py-24'>
      <h3>AI Chat</h3>
      <div className='messages'>
        {messages.map((message) => (
          <div key={message.id} className='whitespace-pre-wrap'>
            <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {message.parts.map((part, i) => (
              <span key={`${message.id}-${i}`}>{part.text}</span>
            ))}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input }); // Send user input to AI
          setInput(''); // Clear input field
        }}
      >
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          placeholder='Type your message...'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatView;
