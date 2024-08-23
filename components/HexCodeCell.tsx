import React, { useState } from "react";

const HexCodeCell = ({ newHexCode }: { newHexCode: string[] }) => {
  const [isCopiedObject, setIsCopiedObject] = useState({
    isCopied: false,
    indexCode: 0,
  });

  const handleCopy = (hexCode: string, index: number) => {
    navigator.clipboard.writeText(hexCode);
    setIsCopiedObject({ isCopied: true, indexCode: index });

    setTimeout(() => {
      setIsCopiedObject({ isCopied: false, indexCode: 0 });
    }, 1000);
  };

  return (
    <div className="grid grid-cols-3 gap-3 mt-7">
      {newHexCode.map((hexCode, index) => {
        const { isCopied, indexCode } = isCopiedObject;

        return (
          <div
            key={index}
            className="m-1 flex flex-row items-center"
            onClick={() => handleCopy(hexCode, index)}
          >
            <div
              style={{ backgroundColor: hexCode }}
              className="w-5 h-5 rounded-sm mr-1"
            />
            <p className="font-semibold uppercase text-white">
              {isCopied && indexCode === index ? "Copied" : hexCode}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HexCodeCell;
