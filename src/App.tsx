import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./vite.svg";
import "./App.css";
import Background from "/illustration/3d-music-art.png";
import { delay, motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen justify-center items-center p-5">
      <div className="w-1/2 flex flex-col h-full rounded-lg justify-between p-3">
        {/* Title Header */}
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="title-font text-4xl">Snekkk</h1>
        </m.div>
        {/* Title Header */}

        {/* Content / Form */}
        <div className="flex flex-col p-5 gap-5">
          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h1 className="text-7xl">Play Favorite</h1>
            <h1 className="text-7xl">Music Anytime</h1>
          </m.div>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 font-thin"
          >
            play your music anywhere, anytime. Elevate your moments with perfect
            soundtrack.
          </m.p>
          <m.hr
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7 }}
          />
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              className="p-3 rounded-full border w-full hover:text-white transition-all hover:bg-[#672bf3]"
              onClick={() => {
                navigate("/browse");
              }}
            >
              Hop on to the player
            </button>
          </m.div>
        </div>
        {/* Content / Form */}

        {/* Footer */}
        <div>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
            className="text-xs"
          >
            This is a non-commercial Spotify clone for educational purposes,
            showcasing basic music streaming functionalities. It's designed to
            help developers learn web development through a practical project.
          </m.p>
        </div>
        {/* Footer */}
      </div>
      <div className="w-1/2 flex h-full overflow-hidden rounded-lg">
        <m.img
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.8, duration: 0.5 }}
          src={Background}
          alt=""
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default App;
