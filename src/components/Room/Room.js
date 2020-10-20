import React, { useState, useEffect } from 'react'; // useEffect allows for lifecycle functions on function components
import queryString from 'query-string';
import io from 'socket.io-client';
import Peer from 'peerjs';

import './Room.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import Stream from '../Stream/Stream';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [peer, setPeer] = useState(undefined);
  const [audioSource, setAudioSource] = useState(undefined);

  const ENDPOINT = 'https://oxcord-525.herokuapp.com/';

  useEffect(() => {
    // runs when component renders
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    const peer = new Peer({
      host: 'peerjs-server.herokuapp.com',
      secure: true,
      port: 443,
    });
    // const peer = new Peer({
    //   host: '/',
    //   port: '9000',
    // });
    peer.on('call', (call) => {
      call.answer();
      call.on('stream', (stream) => {
        setAudioSource(stream);
      });
    });

    peer.on('open', (peerId) => {
      socket.emit('join', { name, room, peerId }, () => {});
    });

    peer.on('error', (error) => {
      console.error(error);
    });

    setPeer(peer);
  }, [ENDPOINT, location.search, audioSource]); // useEffect gets ran only if ENDPOINT or location.search get changed

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, [users]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
      <Stream peer={peer} peerIds={users.map((user) => user.peerId)} />
      <AudioPlayer audioSource={audioSource} />
    </div>
  );
};
export default Chat;
