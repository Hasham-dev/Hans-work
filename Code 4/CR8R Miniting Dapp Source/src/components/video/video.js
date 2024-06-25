import React from "react";
import "./video.css";
import vid from "./background.mp4";

const Video = () => {
  return (
    <>
      <video key={vid} autoPlay loop muted>
        <source src={vid} />
      </video>
    </>
  );
};

export default Video;
