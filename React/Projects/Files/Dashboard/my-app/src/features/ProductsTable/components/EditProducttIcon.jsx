import { BiEdit } from "react-icons/bi";
import Modal from "../../../components/common/Modal";

const EditProducttIcon = () => {
  const Trigger = () => (
    <button className="cursor-pointer text-xl text-green-500">
      <BiEdit className="text-xl" />
    </button>
  );

  return <Modal title="تغییر جزئیات محصول" Trigger={<Trigger />}></Modal>;
};

export default EditProducttIcon;
