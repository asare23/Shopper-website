import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
            <div className='descriptionbox-nav-box'>Description</div>
            <div className='descriptionbox-nav-box fade'>Reviews (122) </div>
        </div>
        <div className='descriptionbox-description'>
            <p>
                Welcome to MyShopper — your ultimate destination for stylish, affordable, and quality products delivered straight to your door.
                We are passionate about offering a seamless online shopping experience where convenience meets choice.
                At MyShopper, we bring you a curated collection of fashion and beauty, etc that cater to every taste, style, and need. 
                Whether you're shopping for the latest trends, timeless classics, or everyday essentials, we've got you covered.
            </p>
            <p>
                Discover a smarter way to shop. Our e-commerce platform brings you the latest trends, everyday essentials, and must-have deals across multiple categories. 
                With an easy-to-use interface, safe checkout, and reliable shipping, we make online shopping effortless and enjoyable for everyone.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox