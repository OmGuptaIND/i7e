import { Icons } from '@/assets/icons';
import { cn } from '@/lib/utils';
import type React from 'react';

type Props = {
  full?: boolean;
  className?: string;
};

const Logo: React.FC<Props> = ({ full, className }) => {
  if (full) {
    return (
      <div className={cn('w-16 h-[25px] cursor-pointer', className)}>
        {Icons.Logo_White}
      </div>
    );
  }

  return (
    <div className={cn('w-[20px] h-5 cursor-pointer', className)}>
      {Icons.Logo_Collapsed_White}
    </div>
  );
};

export default Logo;
