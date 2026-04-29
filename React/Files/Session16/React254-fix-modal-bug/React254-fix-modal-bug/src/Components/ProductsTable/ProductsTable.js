import React from 'react'
import './ProductsTable.css'

export default function ProductsTable() {
  return (
      <table className='products-table'>
          <tr className='products-table-heading-tr'>
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
          </tr>

          <tr className='products-table-tr'> 
              <td>
                  <img src="/img/oil.jpeg" alt="oil image" className='products-table-img' />
              </td>
              <td>روغن سرخ کردنی</td>
              <td>92000 تومان</td>
              <td>82</td>
              <td>
                  <button className='products-table-btn'>جزییات</button>
                  <button className='products-table-btn'>حذف</button>
                  <button className='products-table-btn'>ویرایش</button>
              </td>
          </tr>
      </table>
  )
}
