import clsx from "clsx";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import ModalFooter from "./ModalFooter";

const Modal = ({ Trigger, children, title, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="min-w-max min-h-max cursor-pointer" onClick={openModal}>
        {Trigger}
      </div>

      <div
        id="modal-screen"
        className={clsx(
          "w-dvw h-dvh right-0 top-0 fixed z-10 bg-black/30 flex-center duration-300",
          isOpen ? "" : "invisible opacity-0"
        )}
      >
        <div className="w-[500px] rounded-lg overflow-hidden bg-white drop-shadow-2xl/30 max-h-[90dvh] overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-16">
            <span className="text-[17px] text-zinc-800 font-bold">{title}</span>
            <button
              onClick={closeModal}
              className="text-2xl! text-zinc-500 cursor-pointer"
            >
              <BiX />
            </button>
          </div>
          <div
            id="modal-content"
            className="p-4 py-5 border-y primary-border-color"
          >
            {children}
          </div>

          <div className="min-h-14 flex items-center justify-end gap-2 px-4 bg-[#F6F8FA]">
            <ModalFooter onSubmit={onSubmit} onClose={closeModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
