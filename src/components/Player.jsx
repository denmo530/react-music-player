import { React, useRef, useState } from "react";
import {
  PlayArrowRounded,
  SkipPreviousRounded,
  SkipNextRounded,
  PauseRounded,
} from "@material-ui/icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
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
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
    });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
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
  });

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          name="time-slider"
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <SkipPreviousRounded className="skip-back" fontSize="large" />
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
        <SkipNextRounded className="skip-next" fontSize="large" />
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
