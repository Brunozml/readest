import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { marked } from 'marked';
import { useTranslation } from '@/hooks/useTranslation';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import TextButton from '@/components/TextButton';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    parts: { text: string }[];
    createdAt?: number; // Add timestamp
  };
  onDeleteMessage?: (messageId: string) => void;
}

const ChatMessageItem: React.FC<ChatMessageProps> = ({ message, onDeleteMessage }) => {
  const _ = useTranslation();
  const separatorWidth = useResponsiveSize(3);
  const isUserMessage = message.role === 'user';
  const messageContent = message.parts.map(part => part.text).join('');
  const timestamp = message.createdAt || Date.now();
  
  return (
    <li
      className={clsx(
        'border-base-300 content group relative my-2 rounded-lg p-2',
        isUserMessage ? 'bg-base-300/55' : 'bg-base-100',
        'transition-all duration-300 ease-in-out',
      )}
    >
      <div className={clsx('min-h-4 p-0 transition-all duration-300 ease-in-out')}>
        <div className='flex items-start'>
          <div
            className={clsx(
              'me-2 mt-2.5 min-h-full self-stretch rounded-xl',
              isUserMessage ? 'bg-primary-300' : 'bg-gray-300'
            )}
            style={{ minWidth: `${separatorWidth}px` }}
          ></div>
          
          <div className='content font-size-sm w-full'>
            <div className='font-bold mb-1'>{isUserMessage ? _('You') : _('AI')}</div>
            <div 
              className='content prose prose-sm font-size-sm' 
              dangerouslySetInnerHTML={{ __html: marked.parse(messageContent) }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Message controls - like timestamps and delete button */}
      <div
        className={clsx(
          'max-h-0 overflow-hidden p-0',
          'transition-[max-height] duration-300 ease-in-out',
          'group-hover:max-h-8 group-hover:overflow-visible',
        )}
      >
        <div className='flex cursor-default items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-sm text-gray-500 sm:text-xs'>
              {dayjs(timestamp).fromNow()}
            </span>
          </div>
          {onDeleteMessage && (
            <div className='flex items-center justify-end space-x-3 p-2' dir='ltr'>
              <TextButton
                onClick={() => onDeleteMessage(message.id)}
                variant='danger'
                className='opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'
              >
                {_('Delete')}
              </TextButton>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatMessageItem;