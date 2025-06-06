import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className= 'newsletter'>
        <h1>Get exclusive Offers On Your Emails</h1>
        <p>Subscribe to our newsletter to get the latest updates and offers.</p>
        <form className='newsletter-form'>
            <input type="email" placeholder='Enter your email' required />
            <button type='submit'>Subscribe</button>
        </form>
        <p className='privacy-policy'>We respect your privacy. Unsubscribe at any time.</p>
        
    </div>
  )
}

export default NewsLetter