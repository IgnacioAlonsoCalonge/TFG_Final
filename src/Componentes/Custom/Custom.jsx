import React, { useState} from 'react'
import blanco from '../../Assets/Camisetas_Color/Camiseta_blanca_2.png'
import negro from '../../Assets/Camisetas_Color/Camiseta_Negra.png'
import roja from '../../Assets/Camisetas_Color/Camiseta_Roja.png'
import verde from '../../Assets/Camisetas_Color/Camiseta_Verde_Oscuro.png'
import gris from '../../Assets/Camisetas_Color/Camiseta_Gris.png'
import gris_clarito from '../../Assets/Camisetas_Color/Camiseta_Gris_Clarito.png'
import 'swiper/css';
import "swiper/css/free-mode";
import Boton_2 from '../Botones/Boton_2'
import Dropdown from '../Botones/Dropdown'
import fondo from '../../Assets/Camisetas_Color/Camisetas_Chica/Definitivos_3.png'
import Api from './api.jsx';
import './Custom.css'
import {motion} from 'framer-motion'

import m_blanco from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Blanca.png'
import m_negro from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Negra.png'
import m_roja from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Roja.png'
import m_verde from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Verde.png'
import m_gris from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Naranja.png'
import m_gris_clarito from '../../Assets/Camisetas_Color/Camisetas_Chica/Camiseta_Mujer_Gris.png'

import s_blanco from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Blanca.png'
import s_negro from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Negra.png'
import s_roja from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Roja.png'
import s_verde from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Azul.png'
import s_gris from '../../Assets/Camisetas_Color/Sudaderas/Sudadera_Naranja.png'


import sm_blanco from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Blanca.png'
import sm_negro from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Negra.png'
import sm_roja from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Roja.png'
import sm_azul from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Azul.png'
import sm_azul_c from '../../Assets/Camisetas_Color/Sudaderas_Chica/Sudadera_Mujer_Azul_Clarito.png'

import {TbArrowsExchange2} from 'react-icons/tb'
import {GiHoodie} from 'react-icons/gi'
import {FaTshirt} from 'react-icons/fa'

const Custom = () => {

  const [camiseta, setCamiseta] = useState('blanco');
  const [input, setInput] = useState('')
  const [imageUrl,setImageUrl] = useState(null)
  const [selectedSize, setSelectedSize] = useState('');
  const [pestaña, setPestaña] = useState("ia");
  const [genero, setGenero] = useState(true);
  const [product, setProduct] = useState(true);
  const [colorestampado, setColorestampado] = useState(0);

  const inicial={
    visibles: {
      opacity:1,
      x:0,
      y:0,
      transition:{
        type:"spring",
        duration: 2,
        staggerChildren:0.1, 
        delayChildren:0,
      }
    },

    oculto: {
      opacity:0,
      x:400,
      y:0,
    }
  }

  const imagenes = {
    blanco: blanco,
    negro: negro,
    rojo: roja,
    verde: verde,
    gris: gris,
    gris_clarito: gris_clarito,
  };

  const imagenes_2 = {
    blanco: m_blanco,
    negro: m_negro,
    rojo: m_roja,
    verde: m_verde,
    gris: m_gris,
    gris_clarito: m_gris_clarito,
  };

  const imagenes_3  ={
    blanco: s_blanco,
    negro: s_negro,
    rojo: s_roja,
    verde: s_verde,
    gris: s_gris,
  }

  const imagenes_4 ={
    blanco: sm_blanco,
    negro: sm_negro,
    rojo: sm_roja,
    verde: sm_azul,
    gris: sm_azul_c,
  }


  function handleSizeChange(size){
    setSelectedSize(size);
  }

  function color(value) {
    setCamiseta(value)
  }

  function handleInputChange(event){
    setInput(event.target.value)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };


  function addCart() {
    let a = JSON.parse(localStorage.getItem('myProduct')) || [];

    const nuevoProducto = {
      foto_camiseta: imagenes[camiseta],
      talla: selectedSize,
      foto: imageUrl,
      price: 12,
      color: colorestampado,
      titulo: "Personalizada",
      viveza: 1,
      sepia:0,
    };

    if (product && genero) {
      nuevoProducto.foto_camiseta = imagenes[camiseta] 
      nuevoProducto.price = 12;
   }

   if (!product && !genero) {
     nuevoProducto.foto_camiseta = imagenes_4[camiseta] 
     nuevoProducto.price = 32;
   }

   if (!product && genero) {
     nuevoProducto.foto_camiseta = imagenes_3[camiseta] 
     nuevoProducto.price = 32;
   }

   if (product && !genero) {
     nuevoProducto.foto_camiseta = imagenes_2[camiseta] 
     nuevoProducto.price = 12;
   }

    a.push(nuevoProducto);
    console.log(a)
    localStorage.setItem('myProduct', JSON.stringify(a));
    window.location.href = '/compra';
  }

  async function generateImageRequest(prompt) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Api}`,
          },
          body: JSON.stringify({ inputs: prompt }), // Usar 'prompt' como entrada
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      // Leer la respuesta como un blob
      const blob = await response.blob();
      // Crear una URL para el blob
      const imageUrl = URL.createObjectURL(blob);
      // Actualizar el estado con la URL de la imagen
      setImageUrl(imageUrl);
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function onSubmit(e){
    e.preventDefault();
    generateImageRequest(input);
  }

  const colorEstampado=(e)=>{
    const nuevoValue= e.target.value;
    setColorestampado(nuevoValue);
    console.log(colorestampado);
  }

  return (
    <section id='section_estamp'>
      <div className='pruebas_s'>
        <div className='estados'>
          <div className='foto_cami'>
          <TbArrowsExchange2 className='my_icon' onClick={() => setGenero(!genero)}/>
          { product &&
           <GiHoodie className='my_icon_2' onClick={() => setProduct(!product)}/>
          }

          {
            product === false &&
            <FaTshirt className='my_icon_2' onClick={() => setProduct(!product)}/>
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

            { imageUrl && product && genero && (<img className={`foto_estampado_custom_camiseta_hombre ${camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={imageUrl}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg)` }}/>)
            }

            { imageUrl && product && !genero && (<img className={`foto_estampado_custom_camiseta_mujer ${camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={imageUrl}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg)` }} />)
            }

            {imageUrl && !product && genero && (
              <img
              className={`foto_estampado_custom_sudadera_hombre ${
              camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={imageUrl}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg)` }}
              />
            )}

            { imageUrl && !product && !genero && (<img className={`foto_estampado_custom_sudadera_mujer ${camiseta === 'blanco' ? 'blend_multiply' : camiseta === 'bicolor' ? 'blend_bicolor' : 'blend_normal'}`}
              src={imageUrl}
              alt="Generated Image"
              style={{ filter: `hue-rotate(${colorestampado}deg)` }}/>)
            }

          </div>

          <div className='colores_estamp'>
            <div onClick={()=> color('blanco')} className={camiseta === 'blanco' ? 'blanco activo_custom' : 'blanco'}></div>
            <div onClick={()=> color('negro')} className={camiseta === 'negro' ? 'negro activo_custom' : 'negro'}></div>
            <div onClick={()=> color('rojo')} className={camiseta === 'rojo' ? 'rojo activo_custom' : 'rojo'}></div>
            <div onClick={()=> color('verde')} className={camiseta === 'verde' ? 'verde activo_custom' : 'verde'}></div>
            <div onClick={()=> color('gris')} className={camiseta === 'gris' ? 'gris activo_custom' : 'gris'}></div>
            <div onClick={()=> color('gris_clarito')} className={camiseta === 'gris_clarito' ? 'gris_clarito activo_custom' : 'gris_clarito'}></div>
          </div>
        </div>
        <div className='product_details_descripcion mod'>
          <div className='pestañas'>
            <button className={pestaña==='ia' ? 'activeoption' : 'inactive'} onClick={()=> setPestaña("ia")}>IA</button>
            <button className={pestaña==='local' ? 'activeoption' : 'inactive'} onClick={()=> setPestaña("local")}>Tu imagen</button>
            <button className={pestaña==='nosotros' ? 'activeoption' : 'inactive'} onClick={()=> setPestaña("nosotros")}>Pidenos lo que quieras</button>
          </div>
          <div className='div_fijo'>
          { pestaña === 'local' &&
            <div variants={inicial} initial="oculto" >
              <p>Prueba a ver como queda cualquier imagen que puedas subir y nosotros te la presentamos en tu camiseta</p>
              <label variants={inicial}>
              <input
              variants={inicial} 
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{display:'none' }}
              className='jgj'
              />          
              <div variants={inicial} className="generar">Archivo</div> 
              <div variants={inicial} className='customizada'>
              <h3>Color</h3>
               <input 
                className='colors_input_2'
                type="range"
                min="0"
                max="360"
                value={colorestampado}
                onChange={colorEstampado}
              />
              </div>
              </label>
              <div variants={inicial} className='carrito_talla'>
                <Dropdown onSizeChange={handleSizeChange} selectedSize={selectedSize}/>
                <div variants={inicial} className='details_button'>
                  <Boton_2 onClick={()=>addCart()} className='boton_carrito_details estampados' texto_boton="Añadir al Carrito"/>
                </div>
              </div>
            </div>
          }

          { pestaña === 'ia' &&

          <div variants={inicial} initial="oculto" className='ia_div'>
            <p variants={inicial}>Escribe lo que te gustaría ver en el diseño y pondremos a nuestros mejores trolls a trabajar, ten en cuenta que el diseño que 
              aparezca es ÚNICO y cuando cargues otra imagen desaparecerá, ¡escoge bien!
            </p>
            <textarea variants={inicial} className="text_area" value={input} onChange={handleInputChange} />
            <div variants={inicial} className='customizada'>
              <h3>Color</h3>
               <input 
                className='colors_input_2'
                type="range"
                min="0"
                max="360"
                value={colorestampado}
                onChange={colorEstampado}
              />
              </div>
            <button variants={inicial} whileTap={{scale:0.98}} className='generar' onClick={onSubmit}>Generar</button>
          <div className='carrito_talla'>
            <Dropdown onSizeChange={handleSizeChange} selectedSize={selectedSize}/>
            <div className='details_button'>
            <Boton_2 onClick={()=>addCart()} className='boton_carrito_details estampados' texto_boton="Añadir al Carrito"/>
          </div>
          </div>
          </div>
          }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Custom