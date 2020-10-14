import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

import Message from './Message/Message';

const Messages = ({ name, messages }) => (
  <ScrollToBottom className='messages'>
    {messages.map((message, i) => (
      <div key={i}>
        <Message name={name} message={message} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
