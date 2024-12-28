import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type React from 'react';

type Props = {
  isCollapsed: boolean;
};

const NewChatButton: React.FC<Props> = ({ isCollapsed }) => {
  if (isCollapsed) {
    return (
      <Button variant="ghost" className="w-full bg-primary">
        <Plus className="rounded-full cursor-pointer" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="w-full bg-primary justify-start px-4 py-2"
    >
      <div className="flex items-center gap-3">
        <Plus className="w-5 h-5 -translate-y-[1px]" />
        <span className="text-sm font-medium">Start New Chat</span>
      </div>
    </Button>
  );
};

export default NewChatButton;
