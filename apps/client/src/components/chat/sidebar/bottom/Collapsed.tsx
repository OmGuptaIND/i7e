import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRightToLine } from 'lucide-react';
import type React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  onClick?: () => void;
};

const BottomCollapsed: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <Button
        onClick={onClick}
        className={cn('bg-custom-primary p-2 text-white')}
      >
        <ArrowRightToLine size={24} />
      </Button>

      <div className="grid place-content-center">
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=3159&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default BottomCollapsed;
