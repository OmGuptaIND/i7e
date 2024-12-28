import type React from 'react';
import { ArrowLeftToLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Logo from '../common/Logo';
import BottomIndex from './sidebar/bottom';
import NewChatButton from './sidebar/middle/NewChat';

type Props = {
  isCollapsed: boolean;
  onClick?: () => void;
};

const Sidebar: React.FC<Props> = ({ isCollapsed, onClick }) => {
  return (
    <div className="bg-black h-screen p-2 px-3 border-r-[1px] border-[#262626]">
      <div className="grid grid-rows-[1fr_20fr_2fr] h-full gap-5">
        {/* Logo Section */}
        <section>
          <div className="flex items-center w-full justify-between ">
            <div
              className={cn(
                isCollapsed ? 'w-full grid place-content-center' : '',
              )}
            >
              <Logo full={!isCollapsed} />
            </div>

            <Button
              onClick={onClick}
              className={cn(
                'bg-custom-primary',
                isCollapsed ? 'hidden' : 'block',
              )}
            >
              <ArrowLeftToLine
                size={18}
                className="transition-transform duration-200"
              />
            </Button>
          </div>
        </section>

        {/* Content Section */}
        <section>
          <NewChatButton isCollapsed={isCollapsed} />
        </section>

        {/* End Section */}
        <section className="grid place-content-center gap-2">
          <BottomIndex isCollapsed={isCollapsed} onClick={onClick} />
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
