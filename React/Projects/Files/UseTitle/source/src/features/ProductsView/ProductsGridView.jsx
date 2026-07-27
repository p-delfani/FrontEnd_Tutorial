import Pagination from "../../components/common/Pagination";
import ProductCard from "./ProductCard";

const ProductsGridView = ({ products, paginatedProducts, setProducts }) => {
  return (
    <>
      <div className="grid md:grid-cols-3 mb-20 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:grid-cols-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination items={products} itemsPerPage={5} setItems={setProducts} />
    </>
  );
};

export default ProductsGridView;
