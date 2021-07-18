import React from "react";
import { QueueMusicRounded } from "@material-ui/icons";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <span>
          <QueueMusicRounded />
        </span>
      </button>
    </nav>
  );
};

export default Nav;
