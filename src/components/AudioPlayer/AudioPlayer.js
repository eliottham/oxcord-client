import React, { useEffect, useRef } from 'react';

import './AudioPlayer.css';

const AudioPlayer = ({ audioSource }) => {
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current.srcObject !== audioSource) {
      audioRef.current.srcObject = audioSource;
    }
  });

  const togglePlayback = () => {
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} autoPlay />
      {/* <svg
        id='Capa_1'
        enable-background='new 0 0 512 512'
        height='128'
        viewBox='0 0 512 512'
        width='128'
        xmlns='http://www.w3.org/2000/svg'
        onClick={togglePlayback}
      >
        <g>
          <path d='m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm-181.02 407.02c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z' />
          <path d='m374.782 243.84-180-130c-4.566-3.298-10.596-3.759-15.611-1.195s-8.171 7.722-8.171 13.355v260c0 5.633 3.156 10.791 8.171 13.355 2.154 1.102 4.495 1.645 6.827 1.645 3.097 0 6.179-.958 8.784-2.84l180-130c3.904-2.82 6.218-7.344 6.218-12.16s-2.312-9.34-6.218-12.16zm-173.782 112.824v-201.328l139.381 100.664z' />
        </g>
      </svg> */}
    </div>
  );
};

export default AudioPlayer;
