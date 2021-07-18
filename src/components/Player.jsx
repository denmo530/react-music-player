import { React, useRef, useState } from "react";
import {
  PlayArrowRounded,
  SkipPreviousRounded,
  SkipNextRounded,
  PauseRounded,
} from "@material-ui/icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // Ref
  const audioRef = useRef(null);

  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const autoPlayHandler = (e) => {
    timeUpdateHandler(e);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // Calculate Percentage  on track
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
  };

  const audioEndHandler = () => {
    skipTrackHandler("skip-forward");
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            name="time-slider"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <SkipPreviousRounded
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          fontSize="large"
        />
        {isPlaying ? (
          <PauseRounded
            onClick={playSongHandler}
            className="play"
            fontSize="large"
          />
        ) : (
          <PlayArrowRounded
            onClick={playSongHandler}
            className="play"
            fontSize="large"
          />
        )}
        <SkipNextRounded
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-next"
          fontSize="large"
        />
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        src={currentSong.audio}
        onEnded={audioEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
