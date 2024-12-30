import useClientStore from '@/store';
import type React from 'react';

type Props = {
  chatId: string;
};

const Response: React.FC<Props> = ({ chatId }) => {
  const content = useClientStore(
    (state) => state.chats.find((chat) => chat.chatId === chatId)?.content,
  );

  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

export default Response;
