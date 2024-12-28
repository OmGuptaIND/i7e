import type React from 'react';
import NormalBottom from './Normal';
import BottomCollapsed from './Collapsed';

type Props = {
  onClick?: () => void;
  isCollapsed?: boolean;
};

const BottomIndex: React.FC<Props> = ({ onClick, isCollapsed }) => {
  if (isCollapsed) {
    return <BottomCollapsed onClick={onClick} />;
  }

  return <NormalBottom />;
};

export default BottomIndex;
