import React, { useEffect, useState } from "react";

type Notification = {
  message: string | undefined;
  onClose: () => void;
};

const Notification = ({ message, onClose }: Notification) => {
  console.log({ message });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    message ? setIsVisible(true) : setIsVisible(false);
  }, [message]);

  return (
    <div
      className={`absolute top-0 right-0 m-4 w-64 bg-gray-900 text-white shadow-lg rounded-md overflow-hidden transform transition duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex flex-col">
        <div className="p-4">{message}</div>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Notification;
