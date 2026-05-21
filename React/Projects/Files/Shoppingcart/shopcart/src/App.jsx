import { useState } from "react";
import "./App.css";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Navigation from "./components/Navigation/Navigation";

import productsData from "./../data/products.js";
import Product from "./components/Product/Product";

function App() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    const mainProduct = products.find((product) => product.id === id);

    if (mainProduct) {
      setCart([...cart, mainProduct]);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <>
      <Breadcrumb />

      <section
        id="products-row"
        className="container mx-auto grid grid-cols-4 gap-5"
      >
        {products.map((product) => (
          <Product key={product.id} {...product} addToCart={addToCart} />
        ))}
      </section>

      <Navigation cart={cart} clearCart={clearCart} />
    </>
  );
}

export default App;
