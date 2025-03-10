import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from './ui/button';
import BotMethods from '../api/bot-methods';
import Loader2 from '@/components/Loader';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  interface Message {
    id: number;
    text: string;
    isBot: boolean;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage: Message = { id: messages.length + 1, text: inputValue, isBot: false };
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    await BotMethods.GetResponse(newUserMessage.text).then((response: any) => {
      if (!response.error) {
        const botResponse: Message = { id: messages.length + 2, text: response.reply, isBot: true };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }
    });
      
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl mb-4 w-80 md:w-96 overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">AI Assistant</h3>
            <button
              disabled={isLoading}
              title={isOpen ? "Close chat" : "Open chat"}
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 max-w-[80%] ${message.isBot ? 'ml-0' : 'ml-auto'}`}
              >
                <div className={`p-3 rounded-lg ${message.isBot
                    ? 'bg-purple-100 text-gray-800 rounded-bl-none'
                    : 'bg-purple-600 text-white rounded-br-none ml-auto'
                  }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 cursor-pointer text-white p-2 rounded-r-lg hover:bg-purple-700 transition-colors"
              >
                {isLoading ? <Loader2 /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        title={isOpen ? "Close chat" : "Open chat"}
        className={`${isOpen ? 'bg-gray-600' : 'bg-purple-600'
          } text-white cursor-pointer p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center`}
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default FloatingChatButton;