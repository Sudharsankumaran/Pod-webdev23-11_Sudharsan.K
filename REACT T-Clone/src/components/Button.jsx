import React from "react";

const Button = ({ button }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 z-50">
      <div className="flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-y-0 sm:justify-center px-12 sm:gap-x-4 overflow-x-hidden">
        {button.map((text, id) => (
          <button
            key={id}
            className={`w-full ${
              id === 0 ? "bg-[#393c41] text-white" : "bg-[#e5e6e5]"
            } cursor-pointer rounded-md p-2 font-medium sm:w-80`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Button;

