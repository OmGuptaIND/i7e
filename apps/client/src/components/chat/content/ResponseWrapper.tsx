import React from 'react';
import useClientStore from '@/store';
import Response from './Response';

const ResponseWrapper = () => {
  const chats = useClientStore((state) => state.chats);

  return (
    <div>
      {chats.map(({ chatId }) => {
        return <Response chatId={chatId} key={chatId} />;
      })}
    </div>
  );
};

export default React.memo(ResponseWrapper);
