import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SearchResults = ({ songs, addToQueue, handlePlaySong, queue, setCurrentSongIndex, currentSongIndex }) => {
    const [isQueueVisible, setIsQueueVisible] = useState(false);

    const toggleQueueVisibility = () => {
        setIsQueueVisible((prev) => !prev);
    };

    return (
        <div>
            <h2 style={{ color: '#E5F2FF' }}>Search Results</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={song.id} style={{ marginBottom: '10px', color: '#E5F2FF' }}>
                        {song.title} - {song.artist}
                        <button onClick={() => {
                            addToQueue(song);
                            if (queue.length === 0) setCurrentSongIndex(0);
                            if (queue.length === 1) handlePlaySong(0);
                            if (currentSongIndex === -1) setCurrentSongIndex(0);
                        }} style={{
                            backgroundColor: '#78C091',
                            color: '#E5F2FF',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            marginLeft: '8px'
                        }}>
                            <FontAwesomeIcon icon={faPlus} /> Add to Queue & Play
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={toggleQueueVisibility} style={{
                backgroundColor: '#78C091',
                color: '#E5F2FF',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                cursor: 'pointer',
                marginTop: '10px'
            }}>
                <FontAwesomeIcon icon={isQueueVisible ? faChevronUp : faChevronDown} /> {isQueueVisible ? 'Hide Queue' : 'Show Queue'}
            </button>
            {isQueueVisible && (
                <div style={{ marginTop: '10px', color: '#E5F2FF' }}>
                    <h3>Queue</h3>
                    <ul>
                        {queue.map((song, index) => (
                            <li key={song.id}>{song.title} - {song.artist}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
