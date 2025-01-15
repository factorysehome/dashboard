import React from 'react';

const C_button = ({ text, onClick, className }) => {
  return (
    <button
      type="button" // Corrected button type
      onClick={onClick}
      className={className || "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-xl w-full px-10 py-2.5 text-center text-xl"}
    >
      {text}
    </button>
  );
};

export default C_button;