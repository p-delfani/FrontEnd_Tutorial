function Product({ id, title, description, price, img, addToCart }) {
  return (
    <article className="product-card">
      <header className="product-header">
        <img
          src={img}
          className="product-cover size-full object-cover"
          alt="Product Name"
        />
      </header>
      <main className="product-main">
        <h3 className="font-Ios-15-Bold text-lg">{title}</h3>
        <p className="product-caption">{description} </p>
      </main>
      <footer className="product-footer">
        <div className="product-card.price">
          <span className="xl-text" lang="fa">
            {price.toLocaleString("fa-IR")}
          </span>
          <span>ت</span>
        </div>
        <div>
          <div className="dropdown">
            <span className="rounded-md shadow-sm">
              <button
                className="primary-button"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <span>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </span>
              </button>
            </span>
            <div className="hidden dropdown-menu">
              <div className="dropdown-popup small-dropdown" role="menu">
                <button className="bookmark-btn">
                  افزودن به علاقه مندی‌ها
                </button>
                <button className="add-to-basket" onClick={() => addToCart(id)}>
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <span className="orb"></span>
    </article>
  );
}

export default Product;
