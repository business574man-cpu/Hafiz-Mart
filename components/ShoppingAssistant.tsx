
import React, { useState, useRef, useEffect } from 'react';
// Fix: Corrected module path.
import type { ChatMessage } from '../types';
// Fix: Corrected module path by removing file extension.
import { getShoppingSuggestion } from '../services/geminiService';

const ShoppingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Welcome to Hafiz Mart! How can I help you find the perfect product today?", sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
    };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    const botResponseText = await getShoppingSuggestion(userInput);
    
    const newBotMessage: ChatMessage = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot',
    };
    setMessages(prev => [...prev, newBotMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-110"
        aria-label="Open shopping assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300">
          <header className="bg-secondary text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Shopping Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-xl font-bold">&times;</button>
          </header>

          <main className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 my-1 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="max-w-[80%] p-2 my-1 rounded-lg bg-gray-200 text-gray-800">
                     <span className="animate-pulse">...</span>
                  </div>
               </div>
            )}
            <div ref={chatEndRef} />
          </main>

          <footer className="p-2 border-t">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask for products..."
                className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button type="submit" className="bg-primary text-white px-4 rounded-r-md hover:bg-orange-600 disabled:bg-gray-400" disabled={isLoading}>
                Send
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
};

export default ShoppingAssistant;
