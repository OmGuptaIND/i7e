import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Send, PlusCircle, Image, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const Content = () => {
  const [message, setMessage] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      console.info('Sending message:', message);
      setMessage('');

      if (textRef.current) {
        textRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  useEffect(() => {
    adjustTextareaHeight();

    window.addEventListener('resize', adjustTextareaHeight);
    return () => window.removeEventListener('resize', adjustTextareaHeight);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black">
      <section key="chat-wrapper" className="flex-1 flex flex-col">
        {/* Chat Messages Section */}
        <section
          key="chat-section"
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <div className="flex flex-col space-y-4">
            {/* Messages would go here */}
          </div>
        </section>

        {/* Input Section */}
        <section key="chat-input" className="p-4">
          <div className="max-w-4xl mx-auto bg-neutral-900 rounded-xl p-2 px-4">
            <div className="relative flex ">
              <div className="flex-1 flex items-start">
                <Textarea
                  ref={textRef}
                  value={message}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask i7E a question..."
                  className="flex-1 bg-transparent resize-none text-gray-200 placeholder-gray-500 min-h-[20px] py-0 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                />
              </div>

              <div className="flex">
                <Button
                  onClick={handleSend}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    ' bg-orange-600 hover:bg-orange-700 text-white hover:text-white duration-300 transition-all',
                  )}
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="w-fit flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:bg-custom-hover hover:text-gray-300"
              >
                <PlusCircle className="w-5 h-5" />
              </Button>

              <div
                className={cn(
                  'rounded-lg px-2 py-2 text-xs text-gray-400 flex items-center gap-2 cursor-pointer hover:bg-custom-hover',
                )}
              >
                <span>
                  <Globe className="h-4 w-4" />
                </span>
                <span>Search</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Content;
