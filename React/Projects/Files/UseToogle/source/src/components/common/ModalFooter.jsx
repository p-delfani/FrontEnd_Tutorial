const ModalFooter = ({ onClose, onSubmit }) => {
  const submitHandler = () => {
    onSubmit();
    onClose();
  };

  return (
    <div className="text-sm text-[#666D80] select-none flex items-center gap-2">
      <button
        onClick={onClose}
        className="flex items-center gap-1 cursor-pointer bg-white px-4 py-2 rounded-lg border primary-border-color"
      >
        <span>انصراف</span>
      </button>

      <button
        onClick={submitHandler}
        className="flex items-center gap-1 cursor-pointer primary-bg px-4 py-2 rounded-lg border primary-border-color"
      >
        <span>تایید</span>
      </button>
    </div>
  );
};

export default ModalFooter;
