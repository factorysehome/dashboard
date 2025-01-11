import React from "react";

function C_TextInput({ placeholder, type, id, value, onChange, name, onClick }) {
  return (
    <div>
      <input
        type={type}
        id={id}
        value={value}
        className="bg-black text-white border border-gray-300 text-2xl rounded-lg mt-3 pl-3 w-full mb-2 py-3"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        onClick={onClick}
        required
      />
    </div>
  );
}

export default C_TextInput;
