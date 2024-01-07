import React from 'react'
import './Boton1.css'
import { Link } from 'react-router-dom'

const Boton1 = (props) => {

  const arriba=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth',
    });
  };

  return (
    <div className='section_3_boton'>
        <Link to={props.direccion} onClick={arriba}><span>{props.texto_boton}</span></Link>        
    </div>
  )
}

export default Boton1