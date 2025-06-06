import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/down1.png'
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <div className='cat'>
        <div className='cat-left'>
          <h1>FLAT 50% OFF</h1>
          <p>
            <span>12 </span>
            hours 
            <span> 20 </span>
             Mins
          </p>
          <button>Explore now</button>
        </div>
        <div className='cat-right'>
          <img src = {props.banner} alt = ''/>
        </div>
      </div>

        <div className='shopcategory-indexSort'>
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className='shopcategory-sort'>
            Sort by <img src= {dropdown_icon} alt='drop' />
          </div>
        </div>
        <div className='shopcategory-products'>
          {all_product.map((item,i) => {
            if(props.category === item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
            }
            else {
              return null;
            }
          })}
        </div>
        <div className='shopcategory-loadmore'>
          Explore More
        </div>
    </div>
  )
}

export default ShopCategory 