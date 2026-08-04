import { BiCommentDetail } from "react-icons/bi";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUsers,
} from "react-icons/hi2";

export default [
  {
    id: crypto.randomUUID(),
    title: "منو اصلی",
    items: [
      {
        id: crypto.randomUUID(),
        href: "/",
        title: "داشبورد",
        icon: HiOutlineHome,
      },
      {
        id: crypto.randomUUID(),
        href: "/products",
        title: "محصولات",
        icon: HiOutlineShoppingCart,
      },
      {
        id: crypto.randomUUID(),
        href: "/users",
        title: "کاربران",
        icon: HiOutlineUsers,
      },
      {
        id: crypto.randomUUID(),
        href: "/tickets",
        title: "تیکت ها",
        icon: HiOutlineChatBubbleLeftRight,
      },
      {
        id: crypto.randomUUID(),
        href: "/comments",
        title: "کامنت ها",
        icon: BiCommentDetail,
      },
    ],
  },
];
