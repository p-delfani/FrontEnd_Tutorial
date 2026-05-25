function Product({ id, title, price, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition">
      <img src={image} alt={title} />
      <h3 className="text-lg mb-1">{title}</h3>
      <p className="text-gray-600 mb-3">${price}</p>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        افزودن به سبد خرید
      </button>
    </div>
  );
}

export default Product;
