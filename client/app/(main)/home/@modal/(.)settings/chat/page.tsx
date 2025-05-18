'use client';

import { useState } from 'react';
import ChatMessageCard from './ChatMessageCard';
import Button from '../../../../components/Button';
import '../../../../../styles/global.scss'


const mockMessages = [
  {
    subject: 'Thanks for the feature',
    body: 'I really appreciate the latest update! The store feels faster.',
    sender: 'QueenBee Jewels Team',
  },
  {
    subject: 'More product filter options?',
    body: 'It would be great to filter by brand or collection in the future.',
    sender: 'Raghda Mazhar',
  },
  {
    subject: 'Loyalty Program?',
    body: 'Do you plan to launch a rewards system soon?',
    sender: 'Raghda Mazhar',
  },
  {
    subject: 'Dark mode request',
    body: 'A dark mode would be helpful for night browsing.',
    sender: 'QueenBee Jewels Team',
  },
];

export default function ChatSettings() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSend = () => {
    // TODO: Send message to API
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

  const displayedMessages = showAll ? mockMessages : mockMessages.slice(0, 2);

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
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-queenGold"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Your message..."
              className="w-full h-32 border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-queenGold"
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
        {displayedMessages.map((msg, index) => (
          <ChatMessageCard
            key={index}
            subject={msg.subject}
            body={msg.body}
            sender={msg.sender}
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
