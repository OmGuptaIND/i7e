import type React from 'react';
import { Button } from '../ui/button';

type Props = {
  Sidebar: React.ReactNode;
  Content: React.ReactNode;
  isCollapsed: boolean;
};

export const Dashboard: React.FC<Props> = ({
  Sidebar,
  Content,
  isCollapsed,
}) => {
  return (
    <div className="flex min-h-screen">
      <div
        className={`transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-[5.5%]' : 'w-[15%]'}`}
      >
        {Sidebar}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-[95.5%]' : 'w-[85%]'}`}
      >
        {Content}
      </div>
    </div>
  );
};
