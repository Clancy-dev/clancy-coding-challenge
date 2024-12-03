import React from 'react'

export default function HeroSection() {
  return (
    <div className='hero-section'>
      <div className="left">

        <h1>We bring the store to your door.</h1>
        <p>Get Organic produce ans sustainably secured groceies delivery at upto 4% off grocery.</p>
        <button className='shop-btn'>
          Shop now
        </button>

      </div>
      <div className="right">
        <img src="/bag.png" className='bag-image' alt="image of a bag" />

      </div>
      
    </div>
  )
}
