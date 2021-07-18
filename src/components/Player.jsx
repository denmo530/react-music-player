import { React, useRef } from "react";
import {
  PlayArrowRounded,
  SkipPreviousRounded,
  SkipNextRounded,
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

  return (
    <div className="player">
      <div className="time-control">
        <p>Start time</p>
        <input type="range" name="time-slider" />
        <p>End time</p>
      </div>
      <div className="play-control">
        <SkipPreviousRounded className="skip-back" fontSize="large" />
        <PlayArrowRounded
          onClick={playSongHandler}
          className="play"
          fontSize="large"
        />
        <SkipNextRounded className="skip-next" fontSize="large" />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
