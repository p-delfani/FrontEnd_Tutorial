import SectionTitle from "../../../components/common/SectionTitle";
import OpenInPage from "./OpenInPage";
import { products } from "../../../data/products";
import ProductCard from "./ProductCard";

const LastProducts = () => {
  return (
    <div className="col-span-3">
      <SectionTitle title="آخرین محصولات" />

      <div className="space-y-3 mt-5">
        {products.slice(-3).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <OpenInPage itemsLength={products.length} navigateTo="/products" />
    </div>
  );
};

export default LastProducts;
