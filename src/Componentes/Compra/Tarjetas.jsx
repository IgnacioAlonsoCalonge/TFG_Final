import React from 'react'
import './Tarjetas.css'
import Dropdown_cantidad from '../Botones/Dropdown_cantidad'
import { useState } from 'react'
import fondo from '../../Assets/Camisetas_Color/Camisetas_Chica/Definitivos_3.png'

const Tarjetas = (props) => {

  const [precio, setPrecio] = useState(props.precio);

  function handleCantidad(value){
    setPrecio(props.precio*value)
  }

  return (
    <div className='section_tarjeta'>
      <div className='producto_final'>
        <img className='foto_producto_final_fondo' src={fondo} alt='' />
        <img className='foto_producto_final_camiseta' src={props.imagen} alt='fto'/>
        <img className='foto_producto_final_estampado' src={props.foto}  style={{ filter: `hue-rotate(${props.colorin}deg) saturate(${props.viveza}) sepia(${props.sepia}%)` }} alt='fto'/>
      </div>

        <div className='tarjetas_descripcion'>
            <div onClick={props.onClick} className='cerrar'></div>
            <div className='tarjetas_title_cruz'>
              <h2>{props.titulo}</h2>
            </div>
            <div className='tarjetas_talla_tipo'>
              <p>{props.tipo}</p>
              <p>Talla: {props.talla}</p>
            </div>
            <div className='cantidad_precio'>
                <Dropdown_cantidad 
                handleCantidad={handleCantidad}
                setPrecio={setPrecio}
                precio={props.precio}
                 />
                <h4>{precio}<span>€</span></h4>
            </div>
        </div>
    </div>
  )
}

export default Tarjetas