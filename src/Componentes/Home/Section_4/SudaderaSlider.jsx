import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import Tarjetas from '../../Categorias_2/Tarjetas.jsx';
import { destacados} from "./../../../destacados.js";


const SudaderaSlider = () => {
  return (
    <div>
        <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="swiper"
        slidesPerView={3}
        breakpoints={{
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

            480: {
                slidesPerView: 1,
                spaceBetween: 35,
            },

            700: {
                slidesPerView: 1.6,
                spaceBetween: 30,
            },

            780: {
                slidesPerView: 2,
                spaceBetween: 35,
            },

            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },

            1500: {
                slidesPerView: 3.15,
                spaceBetween: 30,
            }

        }}>
            {destacados.map((destacado) => (
            <SwiperSlide>
              <div key={destacado.id}>
              <Tarjetas 
                    st = {destacado.id}
                    imagen={destacado.foto}
                    titulo={destacado.titulo} 
                    descripcion={destacado.tipo} 
                    inicial={destacado.inicial}
                    precio={destacado.price} />
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default SudaderaSlider