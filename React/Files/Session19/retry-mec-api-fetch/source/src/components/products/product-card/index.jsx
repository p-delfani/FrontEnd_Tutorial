import React from "react";
import Button from "../../button";

export default function ProductCard({ title, description, price, imageSrc }) {
  return (
    <article className="h-[186px] cursor-pointer p-3 rounded-lg duration-150 hover:bg-zinc-100 grow flex gap-6 bg-zinc-50">
      <div className="h-full! min-w-[198px] overflow-hidden">
        <img
          src={imageSrc || "/images/product-1.jpg"}
          alt={title}
          className="object-cover size-full! rounded-lg"
        />
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-2">
          <p className="text-xl font-extrabold">
           {title || " لورم ایپسوم متن ساختگی با تولید"}
          </p>
          <p className="text-sm text-zinc-500 line-clamp-2">
           {description || "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xl font-black">
                {Number(price || 980_000).toLocaleString("fa-IR")}
              </p>
              <span className="text-sm font-bold">تومان</span>
            </div>
          </div>

          <Button>جزئیات محصول</Button>
        </div>
      </div>
    </article>
  );
}
