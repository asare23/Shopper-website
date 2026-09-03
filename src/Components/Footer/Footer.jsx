import React from 'react'
import './Footer.css'
import shoplogo from '../Assets/shopping.png'
import facebookIcon from '../Assets/facebook.png'
import instagramIcon from '../Assets/instagram.png'
import whatsappIcon from '../Assets/whatsapp.png'

const Footer = () => {
  return (
    <div className='footer'>
         <div className='footer-logo'>
            <img src={shoplogo} alt='logo' />
            <p>SHOPPER</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <img src={facebookIcon} alt='' />
            </div>
            <div className='footer-icons-container'>
                <img src={instagramIcon} alt='' />
            </div>
            <div className='footer-icons-container'>
                <img src={whatsappIcon} alt='' />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p>Copyright @ 2025 All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer