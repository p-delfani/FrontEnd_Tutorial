import clsx from "clsx";
import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ProductCard = ({ product }) => {
  return (
    <article className="w-full duration-150 hover:border-zinc-400/90! p-4  space-y-3 border primary-border-color bg-white">
      <header className="h-[200px] w-full flex-center overflow-hidden!">
        <img
          src={product.img}
          className="size-full object-cover duration-150 hover:scale-110  transition-all rounded-lg"
          alt={product.title}
        />
      </header>
      <main className="space-y-2">
        <h2 className="font-bold! line-clamp-2">{product.title}</h2>
        <p className="text-[13px] text-neutral-500 line-clamp-2 h-[39px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-1">
          <div
            className={clsx(
              "badge",
              product.isPublished ? "success-badge" : "danger-badge"
            )}
          >
            {product.isPublished ? (
              <>
                <BsEye />
                منتشر شده
              </>
            ) : (
              <>
                <BsEyeSlash />
                مخفی شده
              </>
            )}
          </div>

          <div className="text-xs text-zinc-600 inline-flex gap-1 items-center">
            <BiShoppingBag className="size-4" />
            <span>تعداد موجودی:</span>
            <span>{product.entity}</span>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1">
          <span className="text-lg font-black">
            {" "}
            {product.price.toLocaleString("fa-IR")}{" "}
          </span>
          <span className="text-zinc-500 text-xs">تومان</span>
        </div>

        <div className="flex items-center gap-1 text-lg!">Icons</div>
      </footer>
    </article>
  );
};

export default ProductCard;
