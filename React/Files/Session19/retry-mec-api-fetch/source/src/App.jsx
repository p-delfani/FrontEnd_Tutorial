import { useEffect, useState } from "react";
import SearchInput from "./components/search-input";
import Header from "./components/header";
import Products from "./components/products";
import Footer from "./components/footer";

import productsData from "./../data/products.js";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([...productsData]);

  const clearSearchResult = () => {
    setSearchValue("");
    setProducts([...productsData]);
  };

  const handleSearch = () => {
    const foundedProducts = productsData.filter((product) =>
      product.title.includes(searchValue)
    );

    setProducts(foundedProducts);
  };

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <div id="content">
      <Header />

      <SearchInput
        inputValue={searchValue}
        onChange={(value) => {
          setSearchValue(value);
        }}
      />

      <Products
        products={products}
        isSearchedSomething={String(searchValue).length}
        onClearSearchResult={clearSearchResult}
      />

      <Footer />
    </div>
  );
}
