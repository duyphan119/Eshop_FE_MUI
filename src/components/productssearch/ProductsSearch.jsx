import React from 'react'
import { Link } from 'react-router-dom';
import * as constants from "../../constants"
import "./productssearch.scss";
const ProductsSearch = ({ keyword, products }) => {
   if(products.length === 0 || keyword === "") return "";
   return (
      <div className='productssearch'>
         <ul className='productssearch__list'>
            {[...products].splice(0, 4).map(item => <li key={item.id} className="productssearch__item">
               <Link to={`/${item.slug}`} className="productssearch__item-img">
                  <img src={constants.SERVER_URL + item.productColors[0].images[0].image}
                     alt=""
                  />
               </Link>
               <div className="productssearch__item-info">
                  <Link to={`/${item.slug}`} className="productssearch__item-name">{item.name}</Link>
                  <div className="productssearch__item-price">{item.newPrice}</div>
               </div>
            </li>)}
         </ul>
         <Link to={`/search?query=${keyword}`}>Xem tất cả ({products.length})</Link>
      </div>
   )
}

export default ProductsSearch