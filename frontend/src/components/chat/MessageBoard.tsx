import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import MessageItem from './MessageItem';
import MessageInputer from './MessageInputer';

interface Message {
  id: string;
  name: string;
  message: string;
  isSender: boolean;
}

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: theme.spacing(2),
    maxWidth: '1440px',

    width: '90%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(1),
    },
}));
  

const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
}));

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (name: string, message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      name,
      message,
      isSender: true, // Assuming this is the current user
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <Container>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            name={msg.name}
            message={msg.message}
            isSender={msg.isSender}
          />
        ))}
      </MessageList>
      <MessageInputer onSend={handleSend} />
    </Container>
  );
};

export default MessageBoard;