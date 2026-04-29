import React from "react";
import ErrorBox from "../Errorbox/Errorbox";
import AddNewProduct from "../AddNewProduct/AddNewProduct";

export default function Products() {
  return (
    <>
      <AddNewProduct />

      <ErrorBox msg="هیچ محصولی یافت نشد" />
    </>
  );
}
