import Content from '@/components/chat/Content';
import Sidebar from '@/components/chat/Sidebar';
import { Dashboard } from '@/components/layout/Dashboard';
import type React from 'react';
import { useState } from 'react';

const ChatPage = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="bg-black text-white h-screen">
      <Dashboard
        Sidebar={
          <Sidebar
            key="chat-sidebar"
            isCollapsed={isCollapsed}
            onClick={handleCollapse}
          />
        }
        Content={<Content />}
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default ChatPage;
