const ToastContainer = ({ message, type = 'success' }) => {
  if (!message) return null;

  const classes = type === 'success'
    ? 'bg-green-100 text-green-800 border-green-200'
    : type === 'error'
    ? 'bg-red-100 text-red-800 border-red-200'
    : 'bg-blue-100 text-blue-800 border-blue-200';

  return (
    <div
      className={`p-4 rounded border-l-4 shadow-md transition-all duration-300 ${classes}`}
    >
      <div className="flex items-start">
        <span
          className={`mr-3 flex-shrink-0 w-4 h-4 rounded ${
            type === 'success'
              ? 'bg-green-400'
              : type === 'error'
              ? 'bg-red-400'
              : 'bg-blue-400'
          }`}
        />
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ToastContainer;