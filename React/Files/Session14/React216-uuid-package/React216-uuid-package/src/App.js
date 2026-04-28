import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [products, setProducts] = useState([
    {id: uuidv4(), title: 'Laptop', price: 40_000_000},
    {id: uuidv4(), title: 'Mobile', price: 10_000_000},
    {id: uuidv4(), title: 'Coolpad', price: 2_000_000},
  ])
  return (
    <div>
      <br /><br /><br /><br />
      <ul>
      {
      products.map((product, index) => (
        <li key={product.id}>{index + 1} - {product.title}</li>
      ))        
      }
      </ul>
    </div>
  )
}

export default App