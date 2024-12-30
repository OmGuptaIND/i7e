import type React from 'react';
import { Textarea } from '../ui/textarea';
import { use, useRef } from 'react';

interface Props {
  message: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<Props> = ({ textRef, message, onChange }) => {
  return (
    <div className="flex-1 flex items-start">
      <Textarea
        ref={textRef}
        value={message}
        onChange={onChange}
        placeholder="Ask i7E a question..."
        className="flex-1 bg-transparent resize-none text-gray-200 placeholder-gray-500 min-h-[20px] pt-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        rows={4}
      />
    </div>
  );
};

export default ChatInput;
