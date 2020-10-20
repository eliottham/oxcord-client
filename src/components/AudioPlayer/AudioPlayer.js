import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioSource }) => {
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current.srcObject !== audioSource) {
      audioRef.current.srcObject = audioSource;
    }
  });

  return (
    <div>
      <audio ref={audioRef} controls volume='true' autoPlay />
    </div>
  );
};

export default AudioPlayer;
