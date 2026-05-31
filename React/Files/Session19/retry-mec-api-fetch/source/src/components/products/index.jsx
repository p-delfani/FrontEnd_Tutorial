import EmptyList from "../empty-list";
import ProductCard from "./product-card";
import Button from "../button";

export default function Products({
  products,
  isSearchedSomething = true,
  onClearSearchResult,
}) {
  return (
    <div className="mt-10 space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black! text-zinc-800">محصولات مرتبط</h2>
        {isSearchedSomething ? (
          <Button onClick={onClearSearchResult} outlined>
            پاکسازی لیست
          </Button>
        ) : null}
      </div>

      {products.length ? (
        <div className="space-y-4">
          {products.map((product, key) => (
            <ProductCard {...product} key={key} />
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
