
import './Categorias_2.css'
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import Tarjetas from './Tarjetas';
import {estampados} from '../../estampados'



const Categorias_2 = () => {

    const arriba=()=>{
        window.scrollTo({
          top:0,
          behavior:'smooth',
        });
      };

      const estampados_animales = estampados.filter((estamp) => estamp.categoria === 'animales');

      const subcategorias = [...new Set(estampados_animales.map((estamp) => estamp.subcategoria))]

  return (

    <div>
        {subcategorias.map((subcategoria,index) => (
            <div className='prob'>
                <h1 className='titulo_cat'>{subcategoria}</h1>
                <Swiper
                key={index}
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="swiper"
                slidesPerView={3.2}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },

                    480: {
                        slidesPerView: 1.1,
                        spaceBetween: 20,
                    },

                    650: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },

                    1024: {
                        slidesPerView: 2.1,
                        spaceBetween: 30,
                    },


                    1200: {
                        slidesPerView: 2.9,
                        spaceBetween: 30,
                    },

                    1500: {
                        slidesPerView: 3.2,
                        spaceBetween: 30,
                    }
                }}>
                    {estampados_animales.filter((estamp) => estamp.subcategoria === subcategoria)
                    .map((estamp,index) => (
                    <SwiperSlide key={estamp.id}>
                        <Tarjetas 
                        st = {estamp.id}
                        onClick={arriba}
                        key={index}
                        imagen={estamp.foto}
                        titulo={estamp.titulo} 
                        descripcion={estamp.tipo}
                        inicial = {estamp.inicial}
                        precio={estamp.price} />
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        ))}            
    </div>
  )
}


export default Categorias_2