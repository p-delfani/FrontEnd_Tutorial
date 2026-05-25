import products from "./../data/products.js";

import Product from "./components/Product";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-6 font-iransans">
        <h1 className="text-3xl font-bold text-center mb-8">
          دوره های آموزش برنامه نویسی
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
