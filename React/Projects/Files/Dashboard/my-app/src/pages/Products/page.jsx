import { CiGrid41, CiViewTable } from "react-icons/ci";
import SectionTitle from "./../../components/common/SectionTitle";
import { useState } from "react";
import { products } from "./../../data/products";
import ProductTableView from "./../../features/ProductsView/ProductsTableView";
import ProductsGridView from "./../../features/ProductsView/ProductsGridView";
import Modal from "./../../components/common/Modal";
import AddProductFields from "../../features/ProductsTable/components/AddProductFields";

const Products = () => {
  const [layoutType, setLayoutType] = useState("TABLE"); // or GRID
  const [allProducts, setAllProducts] = useState([...products]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    price: "",
    img: "/images/product-img.png",
    isPublished: false,
    entity: "",
  });

  const toggleLayout = () => {
    const layout = layoutType === "TABLE" ? "GRID" : "TABLE";
    setLayoutType(layout);
  };

  const createNewProduct = () => {
    setAllProducts([...allProducts, newProduct])

    setNewProduct({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      price: "",
      img: "/images/product-img.png",
      isPublished: false,
      entity: "",
    });
  };

  const Buttons = (
    <>
      <button
        onClick={toggleLayout}
        className="text-2xl size-10 flex-center bg-[#ECEFF3] text-[#818898] *:stroke-1 rounded-md hover:bg-[#e1e4e7] active:scale-90 active:bg-[#ECEFF3]  duration-150 transition-all primary-border-color border cursor-pointer shadow"
      >
        {layoutType === "TABLE" ? <CiGrid41 /> : <CiViewTable />}
      </button>

      <Modal
        title="ایجاد محصول جدید"
        Trigger={
          <button className="primary-bg px-3 py-1.5">ایجاد محصول</button>
        }
        onSubmit={createNewProduct}
      >
        <AddProductFields newProduct={newProduct} onChange={setNewProduct} />
      </Modal>
    </>
  );

  return (
    <>
      <SectionTitle title="لیست محصولات" Buttons={Buttons} />

      <section className="mt-10 w-full! min-w-full!">
        {layoutType === "TABLE" ? (
          <ProductTableView
            products={allProducts}
            paginatedProducts={paginatedProducts}
            setProducts={setPaginatedProducts}
          />
        ) : (
          <ProductsGridView
            products={products}
            paginatedProducts={paginatedProducts}
            setProducts={setPaginatedProducts}
          />
        )}
      </section>
    </>
  );
};

export default Products;
