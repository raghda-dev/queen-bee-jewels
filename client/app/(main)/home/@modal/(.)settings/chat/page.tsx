//client/app/(main)/home/@modal/(.)settings/chat/page.tsx

'use client';

import { useState } from 'react';
import ChatMessageCard from './ChatMessageCard';
import Button from '../../../../components/Button';
import '../../../../../styles/global.scss';
import { useAppDispatch, useAppSelector } from '../../../../lib/redux/hooks';
import {
  addMessage,
  deleteMessage,
  selectMessages,
} from '../../../../lib/redux/chat/chatSlice';

export default function ChatSettings() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showAll, setShowAll] = useState(false);

  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const user = useAppSelector((state) => state.user.user);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;

    dispatch(
      addMessage({
        subject,
        body: message,
        sender: user?.full_name || 'Anonymous',
        avatar: user?.avatar || '',
      })
    );

    setSubject('');
    setMessage('');
  };

  const handleClear = () => {
    setSubject('');
    setMessage('');
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const displayedMessages = showAll ? messages : messages.slice(0, 2);

  return (
    <div className="space-y-10 px-10 md:px-14 pt-11 relative">
      {/* Header + Form */}
      {!showAll && (
        <div>
          <h2 className="text-lg xs:text-xl xs:font-semibold sm:text-2xl lg:text-3xl font-josefin font-medium text-black mb-3 transition-all">
            We would like to hear your suggestions and feedback
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-2 text-xl font-medium focus:outline-none focus:ring-1 focus:ring-queenGold"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Your message..."
              className="w-full h-32 border border-gray-300 rounded-md p-2 text-xl font-normal resize-none focus:outline-none focus:ring-1 focus:ring-queenGold"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <Button onClick={handleSend} size="medium">
                Send message
              </Button>
              <Button onClick={handleClear} variant="secondary" size="medium">
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className={`space-y-3 ${showAll ? 'scrollable-messages' : ''}`}>
        {displayedMessages.map((msg) => (
          <ChatMessageCard
            key={msg.id}
            subject={msg.subject}
            body={msg.body}
            sender={msg.sender}
            avatar={msg.avatar}
            onDelete={() => dispatch(deleteMessage(msg.id))}
          />
        ))}
      </div>

      {/* See More / See Less Button */}
      <div className="pt-2 absolute right-9 md:right-16">
        <Button
          size="medium"
          variant="textButton"
          color="var(--muted-red)"
          animation="text-underline"
          rightIcon={<span>{showAll ? '←' : '→'}</span>}
          onClick={toggleShowAll}
        >
          {showAll ? 'See less' : 'See all'}
        </Button>
      </div>
    </div>
  );
}
