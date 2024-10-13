import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

const Player = ({ songs, currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying, volume, setVolume, setSongs, setTitle }) => {
    const [audio, setAudio] = useState(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (currentSongIndex >= 0 && songs.length > 0) {
            const song = songs[currentSongIndex];
            const playAudio = async () => {
                const response = await fetch(`https://yank.g3v.co.uk/track/${song.id}`);
                const audioUrl = URL.createObjectURL(await response.blob());
                audio.src = audioUrl;
                audio.play();
                setIsPlaying(true);
            };

            playAudio();
            setTitle(`${song.title} - ${song.artist} | Melodix`);
            audio.addEventListener('ended', handleNext);
            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
            });
            return () => {
                audio.removeEventListener('ended', handleNext);
                audio.removeEventListener('timeupdate', () => {
                    setCurrentTime(audio.currentTime);
                    setDuration(audio.duration);
                });
            };
        }
    }, [currentSongIndex, songs]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            setTitle(`Paused - ${songs[currentSongIndex].title} - ${songs[currentSongIndex].artist} | Melodix`);
        } else {
            audio.play();
            setTitle(`${songs[currentSongIndex].title} - ${songs[currentSongIndex].artist} | Melodix`);
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (songs.length > 0) {
            const nextIndex = (currentSongIndex + 1) % songs.length;
            setCurrentSongIndex(nextIndex);
        }
    };

    const handlePrevious = () => {
        if (songs.length > 0) {
            const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            setCurrentSongIndex(prevIndex);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audio.volume = newVolume;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div style={{
            backgroundColor: '#25283D',
            color: '#E5F2FF',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 25px rgba(0, 0, 0, 0.9)',
            marginTop: '20px',
            border: '2px solid #6DC0D5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        }}>
            {currentSongIndex >= 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <img 
                        src={songs[currentSongIndex].images?.big || 'https://us-east-1.tixte.net/uploads/tay.needs.rest/MelodiXLogo.png'} 
                        alt="Album Cover" 
                        style={{
                            width: '70px',
                            borderRadius: isPlaying ? '50%' : '10px',
                            marginRight: '10px',
                            animation: isPlaying ? 'spin 4s linear infinite' : 'none',
                            transition: '0.5s',
                        }} 
                    />
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {songs[currentSongIndex].misc?.explicit ? "🔞 " : ""}{songs[currentSongIndex].title} - {songs[currentSongIndex].artist}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#E5F2FF' }}>
                            Released: {songs[currentSongIndex].misc?.release?.year || 'Unknown Year'}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
                        <button onClick={handlePrevious} style={buttonStyle}>
                            <FontAwesomeIcon icon={faBackward} />
                        </button>
                        <button onClick={handlePlayPause} style={buttonStyle}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                        </button>
                        <button onClick={handleNext} style={buttonStyle}>
                            <FontAwesomeIcon icon={faForward} />
                        </button>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '10px',
                    }}>
                        <label style={{ color: '#E5F2FF', marginTop: '10px' }}>Volume {Math.round(volume * 100)}%</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{
                                width: '100%',
                                marginTop: '5px',
                                backgroundColor: '#25283D',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                </div>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
            }}>
                <span style={{ color: '#E5F2FF', marginRight: '10px' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <input
                    type="range"
                    min="0"
                    max={duration || 1}
                    value={currentTime}
                    onChange={(e) => {
                        const newTime = e.target.value;
                        audio.currentTime = newTime;
                    }}
                    style={{
                        width: '100%',
                        backgroundColor: '#25283D',
                        borderRadius: '5px'
                    }}
                />
            </div>
            <style>
            {`
                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}
        </style>
        </div>

    );
};

const buttonStyle = {
    backgroundColor: '#78C091',
    color: '#E5F2FF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    margin: '0 5px',
};

export default Player;