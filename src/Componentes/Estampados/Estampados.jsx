import React, { useEffect, useState} from 'react'
import './Estampados.css'
import { useParams } from 'react-router-dom'
import {estampados} from '../../estampados'
import {retratos} from '../../retratos'
import blanco from '../../Assets/Camisetas_Color/Camiseta_blanca_2.png'
import negro from '../../Assets/Camisetas_Color/Camiseta_Negra.png'
import roja from '../../Assets/Camisetas_Color/Camiseta_Roja.png'
import verde from '../../Assets/Camisetas_Color/Camiseta_Verde_Oscuro.png'
import gris from '../../Assets/Camisetas_Color/Camiseta_Gris.png'
import naranja from '../../Assets/Camisetas_Color/Camiseta_Gris_Clarito_2.png'
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import { motion } from 'framer-motion'
import Boton_2 from '../Botones/Boton_2'
import Dropdown from '../Botones/Dropdown'
import fondo from '../../Assets/Camisetas_Color/Camisetas_Chica/Definitivos_3.png'

import m_blanco from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Blanca.png'
import m_negro from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Negra.png'
import m_roja from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Roja.png'
import m_verde from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Verde.png'
import m_azul from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Gris.png'
import m_gris_clarito from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Naranja.png'

import s_blanco from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Blanca.png'
import s_negro from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Negra.png'
import s_roja from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Roja.png'
import s_verde from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Verde.png'
import s_azul from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Azul.png'
import s_gris from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Gris.png'


import sm_blanco from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Blanca.png'
import sm_negro from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Negra.png'
import sm_roja from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Roja.png'
import sm_azul from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Azul.png'
import sm_verde from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Verde.png'
import sm_gris from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Gris.png'

import {TbArrowsExchange2} from 'react-icons/tb'
import {GiHoodie} from 'react-icons/gi'
import {FaTshirt} from 'react-icons/fa'

const Estampados = () => {

  let { id } =  useParams();

  const array1 = [...estampados,...retratos];

  let myProduct = array1.find(estampado => estampado.id === id);

  const [camiseta, setCamiseta] = useState(myProduct.inicial);
  const [estamp, setEstamp] = useState(0);
  const [active, setActive] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [option, setOption] = useState('original');
  const [colorestampado, setColorestampado] = useState(0);
  const [viveza, setViveza] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [genero, setGenero] = useState(true);
  const [product, setProduct] = useState(true);
  const [precio, setPrecio] = useState(myProduct.price);

  const imagenes = {
    blanco: blanco,
    negro: negro,
    rojo: roja,
    verde: verde,
    azul: gris,
    gris_1: naranja,
  };

  const imagenes_2 = {
    blanco: m_blanco,
    negro: m_negro,
    rojo: m_roja,
    verde: m_verde,
    azul: m_azul,
    gris_1: m_gris_clarito,

  };

  const imagenes_3  ={
    blanco: s_blanco,
    negro: s_negro,
    rojo: s_roja,
    verde: s_verde,
    azul: s_azul,
    gris_1: s_gris,
  }

  const imagenes_4 ={
    blanco: sm_blanco,
    negro: sm_negro,
    rojo: sm_roja,
    verde: sm_verde,
    azul: sm_azul,
    gris_1: sm_gris,
  }

  const estamps = [myProduct.foto].concat(myProduct.relacionados)

  const slidesPerView = estamps.length > 2 ? 2.5 : 2;

  function handleSizeChange(size){
    setSelectedSize(size);
  }

  function color(value) {
    setCamiseta(value)
  }


  function addCart() {

    let a = JSON.parse(localStorage.getItem('myProduct')) || [];
    
    const nuevoProducto = {
      ...myProduct,
      talla: selectedSize,
      color: colorestampado,
      viveza: viveza/100,
      sepia: sepia,
    };

    if (product && genero) {
       nuevoProducto.foto_camiseta = imagenes[camiseta] 
       nuevoProducto.price = myProduct.price;
    }

    if (!product && !genero) {
      nuevoProducto.foto_camiseta = imagenes_4[camiseta] 
      nuevoProducto.price = myProduct.price + 20;
    }

    if (!product && genero) {
      nuevoProducto.foto_camiseta = imagenes_3[camiseta] 
      nuevoProducto.price = myProduct.price + 20;
    }

    if (product && !genero) {
      nuevoProducto.foto_camiseta = imagenes_2[camiseta] 
      nuevoProducto.price = myProduct.price;
    }

    a.push(nuevoProducto);
    
    console.log(a)

    localStorage.setItem('myProduct', JSON.stringify(a));

    window.location.href = '/compra';

  }


  function handleOption(opcion){
    setOption(opcion)
  }

  function color(value) {
    setCamiseta(value)
  }

  const colorEstampado=(e)=>{
    const nuevoValue= e.target.value;
    setColorestampado(nuevoValue);
    console.log(colorestampado);
  }

  const cambioViveza=(e)=>{
    const nuevoValue= e.target.value;
    setViveza(nuevoValue);
  }

    const cambioSepia=(e)=>{
    const nuevoValue= e.target.value;
    setSepia(nuevoValue);
  }

  function combo(){
    setOption("original");
    setColorestampado(0);
    setViveza(100);
    setSepia(0)
  }

  function setSudadera(){
    setProduct(!product)
    setPrecio(precio+20);
  }

  function setCam(){
    setProduct(!product)
    setPrecio(precio-20);
  }

  return (
    <section id='section_estamp'>
      <div className='pruebas_s'>
        <div className='estados'>
          <div  
                className='foto_cami'>
          <TbArrowsExchange2 className='my_icon' onClick={() => setGenero(!genero)}/>
          { product &&
           <GiHoodie className='my_icon_2' onClick={() => setSudadera()}/>
          }

          {
            product === false &&
            <FaTshirt className='my_icon_2' onClick={() => setCam()}/>
          }
            <img className='foto_fondo' src={fondo} alt='fondo_madera'/>

            { product && genero &&
            <img className='foto_camisetas_color' src={imagenes[camiseta]}  alt='s'/>
            }

            { product && !genero &&
            <img className='foto_camisetas_color' src={imagenes_2[camiseta]}  alt='s'/>
            }
            
            { !product && genero &&
            <img className='foto_camisetas_color_sudaderas' src={imagenes_3[camiseta]}  alt='s'/>
            }
            
            { !product && !genero &&
            <img className='foto_camisetas_color' src={imagenes_4[camiseta]}  alt='s'/>
            }

            { !product && genero && (
              <img
              className={`foto_estampado_custom_sudadera_hombre ${
              camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={estamps[estamp]}
              alt="estampado"
              style={{ filter: `hue-rotate(${colorestampado}deg) saturate(${viveza/100}) sepia(${sepia}%)`}}
              />
            )}

            { product && genero && (
              <img 
              className={`foto_estampado_custom_camiseta_hombre ${
              camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={estamps[estamp]}
              alt="estampado"
              style={{ filter: `hue-rotate(${colorestampado}deg) saturate(${viveza/100}) sepia(${sepia}%)`}}
              />)
            }

            { !product && genero && (
              <img
              className={`foto_estampado_custom_sudadera_hombre ${
              camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={estamps[estamp]}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg) saturate(${viveza/100}) sepia(${sepia}%)`}}
              />
            )}

            { product && !genero && (
              <img 
              className={`foto_estampado_custom_camiseta_mujer 
              ${camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={estamps[estamp]}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg) saturate(${viveza/100}) sepia(${sepia}%)`}} />)
            }

            { !product && !genero && (<img className={`foto_estampado_custom_sudadera_mujer ${camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={estamps[estamp]}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg) saturate(${viveza/100}) sepia(${sepia}%)`}} />)
            }
            
          </div>

          <div className='colores_estamp'>
            <div onClick={()=> color('blanco')} className={camiseta === 'blanco' ? 'blanco activo_custom' : 'blanco'}></div>
            <div onClick={()=> color('negro')} className={camiseta === 'negro' ? 'negro activo_custom' : 'negro'}></div>
            <div onClick={()=> color('rojo')} className={camiseta === 'rojo' ? 'rojo activo_custom' : 'rojo'}></div>
            <div onClick={()=> color('verde')} className={camiseta === 'verde' ? 'verde activo_custom' : 'verde'}></div>
            <div onClick={()=> color('azul')} className={camiseta === 'azul' ? 'azul activo_custom' : 'azul'}></div>
            <div onClick={()=> color('gris_1')} className={camiseta === 'gris_1' ? 'gris_1 activo_custom' : 'gris_1'}></div>
          </div>
        </div>
        <div className='product_details_descripcion mod'>
          <div className='pestañas'>
            <button className={option==='original' ? 'activeoption' : 'inactive'} onClick={combo}>Original</button>
            <button className={option==='custom' ? 'activeoption' : 'inactive'} onClick={()=> setOption("custom")}>Custom</button>
          </div>
          { (myProduct.relacionados  && myProduct.relacionados.length>0) ?
          (<div className='swiper_my'>
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            className="swiper_s"
            slidesPerView={slidesPerView}
            spaceBetween={10}
            breakpoints={{
            }}>
            {estamps.map((product,index) => (
            <SwiperSlide 
            key={index}
            onClick={()=>setEstamp(index)}>
                <img onClick={()=>setActive(index)} className={index===active ? "active" : ""} src={product}/>
            </SwiperSlide>
            ))}
            </Swiper>
        </div>
              ):null}
              { option === "original" &&
              <div>
                <div className='title_estampados'>
                  <h2>{myProduct.titulo}</h2>
                  {
                    <h3>{precio}€</h3>
                  }

                </div>
              <p className="description_1">{myProduct.descripcion}</p>
              </div>
            }
            { option === 'custom'  &&
            <div  className='customizada'>
              <p className='description_1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus et quod, ratione alias quam sapiente ea. Obcaecati error maiores dolorem quod aliquid. Quibusdam, ad suscipit totam mollitia tenetur quam sint!</p>
              <h3 >Color</h3>
               <input 
                className='colors_input_2'
                type="range"
                min="0"
                max="360"
                value={colorestampado}
                onChange={colorEstampado}
              />
              <h3>Viveza</h3>
                <input 
                  className='viveza_input'
                  type="range"
                  min="0"
                  max="200"
                  value={viveza}
                  onChange={cambioViveza}
                />

                 <h3>Sepia</h3>
                <input 
                  className='sepia_input'
                  type="range"
                  min="0"
                  max="100"
                  value={sepia}
                  onChange={cambioSepia}
                />
            </div>
            }

            <div className='carrito_talla'>
            <Dropdown onSizeChange={handleSizeChange} selectedSize={selectedSize}/>
            <div className='details_button'>
                <Boton_2 onClick={()=>addCart()} className='boton_carrito_details estampados' texto_boton="Añadir al Carrito"/>
            </div>
            </div>
         </div>
      </div>
    </section>
  )
}

export default Estampados