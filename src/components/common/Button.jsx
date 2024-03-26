import React from 'react';

export const BlueButton = ({ content, width, href }) => {
  const buttonStyle = {
    width: width ? width : 'auto',
  };

  return (
    <div>
      <button
        href={href}
        type="button"
        style={buttonStyle}
        className="font-semibold text-center rounded-xl bg-pri px-2 text-xs md:text-base md:px-3 md:px-10 py-4 hover:bg-blue-500 btn-gradient text-white"
      >
        {content}
      </button>
    </div>
  );
};

export const GlassButton = ({ text, icon }) => {
  return (
    <div className="font-semibold py-3 md:min-w-[12%] border-2 text-white px-8 rounded-xl inline-flex items-center justify-center gap-2">
      {icon}
      <button>{text}</button>
    </div>
  );
};
