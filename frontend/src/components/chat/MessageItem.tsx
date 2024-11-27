import React from 'react';
import { Box, Typography, styled } from '@mui/material';

interface MessageItemProps {
  name: string;
  message: string;
  isSender: boolean; // True if the message is sent by the current user
}

const Container = styled(Box)<{ isSender: boolean }>(({ theme, isSender }) => ({
  display: 'flex',
  justifyContent: isSender ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
  width: '100%'
}));

const MessageBubble = styled(Box)<{ isSender: boolean }>(({ theme, isSender }) => ({
    maxWidth: '60%',
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    backgroundColor: isSender ? theme.palette.primary.main : theme.palette.grey[300],
    color: isSender ? theme.palette.primary.contrastText : theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexDirection: 'column',
  
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%', 
    },
  }));

const SenderName = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const MessageItem: React.FC<MessageItemProps> = ({ name, message, isSender }) => {
  return (
    <Container isSender={isSender}>
      <MessageBubble isSender={isSender}>
        {!isSender && <SenderName>{name}</SenderName>}
        <Typography>{message}</Typography>
      </MessageBubble>
    </Container>
  );
};

export default MessageItem;
