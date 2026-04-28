import React, { useState } from 'react';
import menus from './data'
import Categories from './Components/Categories'

const allCategories = ['all', ...new Set(menus.map(menu => menu.category))]

function App() {

  console.log(allCategories);

  const [allMenus, setAllMenus] = useState(menus)
  const [categories, setCategories] = useState(allCategories)

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} />
      </section>
    </main>
  );
}

export default App;
