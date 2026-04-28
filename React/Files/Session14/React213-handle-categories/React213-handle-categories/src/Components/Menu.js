import React from "react";

const Menu = () => {
  return (
    <div className="section-center">
      <article className="menu-item">
        <img src="./images/item-8.jpeg" className="photo" />
        <div className="item-info">
          <header>
            <h4>Menu Title</h4>
            <h4 className="price">$89</h4>
          </header>
          <p className="item-text">desc here</p>
        </div>
      </article>
    </div>
  );
};

export default Menu;
