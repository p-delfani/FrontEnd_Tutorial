import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router";

const ProductCard = ({ title, description, price, img }) => {
  return (
    <article className="flex duration-150 bg-white shadow hover:bg-gradient-to-t hover:from-neutral-100/70 hover:scale-101  border primary-border-color p-3 rounded-md h-30 items-center grow gap-3 cursor-pointer">
      <div className="size-24! min-w-24 max-w-24">
        <img
          src={img}
          alt={title}
          className="size-full rounded-lg object-cover"
        />
      </div>
      <div className="h-full flex justify-between flex-col">
        <div className="space-y-1">
          <p>
            <strong>{title}</strong>
          </p>
          <p className="text-sm text-neutral-600 line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-black">
              {" "}
              {Number(price).toLocaleString("fa-IR")}{" "}
            </span>
            <span className="text-sm text-neutral-500">تومان</span>
          </div>
          <div>
            <Link to="/products" className="text-base text-neutral-400">
              <FaEllipsisV />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
