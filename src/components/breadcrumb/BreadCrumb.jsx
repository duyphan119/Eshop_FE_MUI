import React from 'react'
import { Link } from 'react-router-dom'
import "./breadcrumb.scss";



const BreadCrumb = ({ items }) => {
   return (
      <ul className='breadcrumb__list'>
         {items.map((item, index) => <li key={item.name} className="breadcrumb__item">
            <Link to={item.link} className="breadcrumb__item-link">
               {item.name}
            </Link>
            {index !== items.length - 1 && <span>/</span>}
         </li>)}
      </ul>
   )
}

export default BreadCrumb