import { WindowProps } from "@prozilla-os/core";
import { useState } from "react";
import Player from "./Player";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Song } from "../types/song"; // Ensure this import is correct

const Melodix: React.FC<WindowProps> = ({ app, setTitle }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlayerVisible, setPlayerVisible] = useState<boolean>(true); // Define player visibility state
  const [volume, setVolume] = useState<number>(1); // Define volume state

  const togglePlayerVisibility = () => {
    setPlayerVisible((prev) => !prev); // Toggle player visibility
  };

  const addToQueue = (song: Song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  };

  const handlePlaySong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div style={{
      backgroundColor: "#25283D",
      color: "#E5F2FF",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <button onClick={togglePlayerVisibility} style={buttonStyle}>
        <FontAwesomeIcon icon={faMusic} /> {isPlayerVisible ? "Hide Player" : "Show Player"}
      </button>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <Search 
          setSongs={setSongs} 
          addToQueue={addToQueue} 
          queue={queue} 
          setCurrentSongIndex={setCurrentSongIndex} 
          currentSongIndex={currentSongIndex} 
          handlePlaySong={handlePlaySong} // Pass the function here
        />
      </div>

      {isPlayerVisible && (
        <div style={{
          position: "fixed",
          bottom: 5,
          left: 0,
          right: 0,
          background: "#1E262E",
          maxHeight: "30vh",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)"
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
            setTitle={setTitle || (() => {})} // Provide a default function if undefined
          />
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#78C091",
  color: "#E5F2FF",
  border: "none",
  borderRadius: "5px",
  padding: "10px",
  cursor: "pointer",
  marginBottom: "10px",
};

export default Melodix;
