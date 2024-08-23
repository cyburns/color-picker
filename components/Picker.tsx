"use client";

import React, { useState } from "react";

interface EyeDropperConstructor {
  new (): EyeDropper;
}

interface EyeDropper {
  open(): Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper: EyeDropperConstructor;
  }
}

const Picker = () => {
  const [newHexCode, setNewHexCode] = useState<string[]>([]);

  const launchEyeDroper = async () => {
    if (!window.EyeDropper) {
      console.error("EyeDropper API is not supported in this browser.");
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      if (!newHexCode.includes(result.sRGBHex)) {
        setNewHexCode([...newHexCode, result.sRGBHex]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center flex-col max-w-xs">
      <button
        onClick={launchEyeDroper}
        className="px-5 py-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:shadow-xl transition duration-200 hover:opacity-70 flex flex-row items-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1.1em"
          width="1.1em"
          className="mr-1"
        >
          <path d="M19.35 11.72l-2.13 2.13-1.41-1.42-7.71 7.71L3.5 22 2 20.5l1.86-4.6 7.71-7.71-1.42-1.41 2.13-2.13 7.07 7.07M16.76 3A3 3 0 0121 3a3 3 0 010 4.24l-1.92 1.92-4.24-4.24L16.76 3M5.56 17.03L4.5 19.5l2.47-1.06L14.4 11 13 9.6l-7.44 7.43z" />
        </svg>
        Pick a color
      </button>

      <div className="flex justify-between  w-full mt-5">
        <h2>Colors</h2>
        <button>Clear all</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-7">
        {newHexCode.map((hexCode, index) => (
          <div key={index} className="m-1 flex flex-row items-center">
            <div
              style={{ backgroundColor: hexCode }}
              className="w-5 h-5 rounded-sm mr-1"
            />
            <p className="font-semibold uppercase text-white">{hexCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picker;
