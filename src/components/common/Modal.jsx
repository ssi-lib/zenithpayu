const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center px-5">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <button onClick={onClose} className="absolute top-0 right-0 m-4">
          Close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
