type Alert = {
  message: string | undefined;
  onClose: () => void;
};

const Alert = ({ message, onClose }: Alert) => {
  return (
    <div className="p-4 mt-4 mb-4 bg-green-500 text-white success">
      <div className="flex justify-between items-center">
        <div>{message}</div>
        <button
          className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-600 text-gray-500 hover:text-gray-50 focus:text-gray-300 focus:bg-gray-500 focus:outline-none"
          onClick={onClose}
        >
          <span className="text-sm">x</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
