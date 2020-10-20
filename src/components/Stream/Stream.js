import React from 'react';

const Stream = ({ peer, peerIds }) => {
  async function startCapture() {
    let captureStream;
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          googAutoGainControl: false,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
          channelCount: 2,
        },
      });
      const videoTrack = captureStream.getVideoTracks()[0];
      videoTrack.stop();
      captureStream.removeTrack(videoTrack);
    } catch (err) {
      console.error('Capturing media failed: ' + err);
    }
    for (const peerId of peerIds) {
      if (peerId !== peerId.id) {
        peer.call(peerId, captureStream, {
          sdpTransform: (sdp) => {
            sdp = sdp.replace(
              'useinbandfec=1',
              'useinbandfec=1; stereo=1; maxaveragebitrate=51000'
            );
            return sdp;
          },
        });
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
