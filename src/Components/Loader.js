import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loaderImg from '../Imgs/loader.gif'

function Loader() {
  return (
    <div className="loader_main">
      <Player
        autoplay
        loop
        src="https://lottie.host/cdfe993f-1ac8-4156-9fce-386e1b40b4a4/4i5vWT2yBS.json"
        style={{ height: "150px", width: "150px" }}
      ></Player>
      {/* <img src={loaderImg} /> */}
    </div>
  );
}

export default Loader;
