import React, { useEffect, useState, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import './AudioPlayer.css';

const AudioPlayer = ({ audioSource }) => {
  const [playbackStatus, setPlaybackStatus] = useState('pause');
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current.srcObject !== audioSource) {
      audioRef.current.srcObject = audioSource;
      let playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.then(() => {
          console.log('stream started');
          setPlaybackStatus('play');
        });
      }
    }
  }, [audioSource]);

  const playPauseClick = () => {
    if (playbackStatus === 'pause') {
      let playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.then(() => {
          setPlaybackStatus('play');
        });
      }
    } else {
      audioRef.current.pause();
      setPlaybackStatus('pause');
    }
  };

  const getPlayPauseButton = () => {
    return playbackStatus === 'pause' ? (
      <IconButton onClick={playPauseClick}>
        <PlayCircleOutlineIcon />
      </IconButton>
    ) : (
      <IconButton onClick={playPauseClick}>
        <PauseCircleOutlineIcon />
      </IconButton>
    );
  };

  return (
    <div>
      <audio ref={audioRef} />
      <IconButton aria-label='skip previous'>
        <SkipPreviousIcon />
      </IconButton>
      {getPlayPauseButton()}
      <IconButton aria-label='skip next'>
        <SkipNextIcon />
      </IconButton>
    </div>
  );
};

export default AudioPlayer;
