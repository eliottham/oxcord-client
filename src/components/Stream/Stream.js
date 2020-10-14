import React from 'react';

const Stream = ({ peer, peerIds }) => {
  async function startCapture() {
    let captureStream;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const videoTrack = captureStream.getVideoTracks()[0];
      videoTrack.stop();
      captureStream.removeTrack(videoTrack);
    } catch (err) {
      console.error('Capturing media failed: ' + err);
    }
    for (const peerId of peerIds) {
      if (peerId !== peerId.id) {
        peer.call(peerId, captureStream);
      }
    }
  }

  return (
    <div>
      <div onClick={startCapture}>Stream</div>
    </div>
  );
};

export default Stream;
