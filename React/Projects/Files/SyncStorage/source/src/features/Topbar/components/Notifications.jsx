import { BiBell } from "react-icons/bi";

const Notifications = () => {
  return (
    <button className="flex size-10 border primary-border-color rounded-full items-center justify-center cursor-pointer hover:text-white hover:primary-bg">
      <BiBell className="text-[21px]" />
    </button>
  );
};

export default Notifications;
