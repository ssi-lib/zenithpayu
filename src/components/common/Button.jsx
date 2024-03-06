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
        className="font-semibold text-center rounded-md bg-pri px-3 md:px-10 py-4 hover:bg-blue-500 btn-gradient text-white"
      >
        {content}
      </button>
    </div>
  );
};

export const GlassButton = ({ text, icon }) => {
  return (
    <div className="font-semibold py-3 md:min-w-[12%] px-8 border-2 text-white my-8 rounded-md inline-flex items-center justify-center gap-2">
      {icon}
      <button>{text}</button>
    </div>
  );
};
