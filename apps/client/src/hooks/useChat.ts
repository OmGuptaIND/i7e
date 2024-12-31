import { env } from '@/env';
import useClientStore from '@/store';
import { useMutation } from '@tanstack/react-query';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskRequest {
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response_id: string;
  type: 'content' | 'error' | 'done';
  content: string;
}

export const useChat = () => {
  const sessionId = useClientStore((state) => state.user.sessionId);
  const addChat = useClientStore((state) => state.addChat);
  const setSessionId = useClientStore((state) => state.setSessionId);
  const addContent = useClientStore((state) => state.addContent);

  const { mutateAsync: createChat, isPending: isCreatingSession } = useMutation(
    {
      mutationFn: async (): Promise<{ sessionId: string }> => {
        const response = await fetch(
          `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/generate/create`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'openai',
            }),
          },
        );

        const data = await response.json();

        console.info('Create chat response:', data);

        if (!response.ok) {
          throw new Error(data.error);
        }

        if (!data.session_id) {
          throw new Error('No session ID returned');
        }

        setSessionId(data.session_id);

        return data.session_id;
      },
    },
  );

  const { mutateAsync: sendMessage, isPending: isAsking } = useMutation({
    mutationFn: async (message: Message) => {
      const request: AskRequest = {
        content: message.content,
        role: message.role,
        session_id: sessionId,
      };

      const response = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/v1/generate/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        },
      );

      addChat({
        chatId: Math.random().toString(36).slice(0, 8),
        content: message.content,
        role: message.role,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();

      if (!reader) throw new Error('No response reader');

      const chatId = Math.random().toString(36).slice(0, 8);

      addChat({
        chatId,
        content: '',
        role: 'assistant',
      });

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = new TextDecoder().decode(value);

        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6) as unknown as string;

            if (data === '[DONE]') continue;

            const responseContent = JSON.parse(data) as ChatResponse;

            addContent(chatId, responseContent.content);
          }
        }
      }
    },
  });

  return {
    createChat,
    sendMessage,
    isAsking,
    sessionId,
    isCreatingSession,
  };
};
