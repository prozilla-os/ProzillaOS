import { WindowProps } from "@prozilla-os/core";
import { useState } from 'react';
import Player from './Player';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

export function melodix({ app, setTitle }: WindowProps) {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range from 0 to 1
  const [queue, setQueue] = useState([]);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true); // State to control Player visibility

  const togglePlayerVisibility = () => {
    setIsPlayerVisible((prev) => !prev);
  };

  const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  };

  const handlePlaySong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true); // Set playing state when a song is selected
  };

  return (
    <div style={{
      backgroundColor: '#25283D',
      color: '#E5F2FF',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <button onClick={togglePlayerVisibility} style={buttonStyle}>
        <FontAwesomeIcon icon={faMusic} /> {isPlayerVisible ? 'Hide Player' : 'Show Player'}
      </button>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <Search setSongs={setSongs} addToQueue={addToQueue} queue={queue} setCurrentSongIndex={setCurrentSongIndex} currentSongIndex={currentSongIndex}/>
      </div>

      {isPlayerVisible && (
        <div style={{
          position: 'fixed',
          bottom: 5,
          left: 0,
          right: 0,
          background: '#1E262E',
          maxHeight: '30vh', // Increased maxHeight from 20vh to 30vh
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
        }}>
          <Player
            songs={queue.length > 0 ? queue : songs}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            volume={volume}
            setVolume={setVolume}
            setSongs={setSongs}
            setTitle={setTitle}
          />
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#78C091',
  color: '#E5F2FF',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
  marginBottom: '10px',
};
