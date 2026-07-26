import { HiEye } from "react-icons/hi";
import Modal from "../../../components/common/Modal";
import clsx from "clsx";

const ChangeVisibilityIcon = ({ product, handler }) => {
  const Trigger = () => (
    <button className="cursor-pointer text-xl text-sky-500">
      <HiEye className="text-xl" />
    </button>
  );

  return (
    <Modal
      title="تغییر وضعیت انتشار"
      Trigger={<Trigger />}
      onSubmit={() => handler(product.id)}
    >
      <div className="flex items-center justify-center">
        <p>
          آیا از{" "}
          <span
            className={clsx(
              product.isPublished ? "text-blue-500" : "text-green-500"
            )}
          >
            {" "}
            <strong>{product.isPublished ? "خصوصی" : "عمومی"}</strong>
          </span>{" "}
          کردن این محصول اطمینان دارید؟
        </p>
      </div>
    </Modal>
  );
};

export default ChangeVisibilityIcon;
