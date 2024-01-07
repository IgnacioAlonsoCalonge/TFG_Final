import React from 'react'
import './Section_4.css'
import SudaderaSlider from './SudaderaSlider'



const Section_4 = () => {
  return (
    <section id="section_4">
        <div className='section_4_title'>
          <h1>Diseños destacados</h1>
        </div>
        <div className='section_4_contenedor'>
            <SudaderaSlider/>
        </div>
    </section>
  )
}

export default Section_4