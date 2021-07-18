import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ setSongs, songs, setCurrentSong, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus && "activeLibrary"} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            id={song.id}
            songs={songs}
            setCurrentSong={setCurrentSong}
            song={song}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
