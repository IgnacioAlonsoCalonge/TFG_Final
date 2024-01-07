import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

import {FiShoppingCart} from 'react-icons/fi'
import {FaUser} from 'react-icons/fa'
import { useState, useEffect } from 'react'

import { useCart } from '../Compra/CartContext'

const NavBar = () => {

    const [active, setActive] = useState(false);
    const { productos,setProductos } = useCart();
  
    function dropd(){
      setActive(!active);
    }

    useEffect(() => {
        const pr= localStorage.getItem('myProduct');
        if (pr){
          const proc = JSON.parse(pr);
          setProductos(proc);
        }
      }, []);

      const arriba=()=>{
        window.scrollTo({
          top:0,
          behavior:'smooth',
        });
      };

  return (
    <div className='navigation_bar'>

        <h1 className={ active ? 'logo active' : 'logo'}>Logo</h1>

        <div className='navigation_pestanas'>
            <ul>
                <li>
                    <Link onClick={arriba} to='/'>Home</Link>
                </li>
                <li>
                    <Link onClick={arriba} to='/productos'>Productos</Link>
                </li>
                <li>
                    <Link onClick={arriba} to='/custom'>Custom</Link>
                </li>
                <li>
                    <Link onClick={arriba} to='/'>Proximamente</Link>
                </li>
            </ul>
        </div>
 
        <div className='navigation_responsive' onClick={dropd}>
            <div className={ active ? 'navigation_menu active' : 'navigation_menu'} ></div>
        </div>

        <div className={ active ? 'menu_responsive active' : 'menu_responsive'}>

            {active && 
            
           <div className='menu_responsive_'>
                <ul>
                    <li onClick={dropd}>
                        <Link onClick={arriba} to='/'>Home</Link>
                    </li>
                    <li onClick={dropd}>
                        <Link onClick={arriba} to='/productos'>Productos</Link>
                    </li>
                    <li onClick={dropd}>
                        <Link onClick={arriba} to='/custom'>Custom</Link>
                    </li>
                    <li onClick={dropd}>
                    <div className='numeracion'>
                        <Link onClick={arriba} to='/compra'><FiShoppingCart className='navigation_carrito_icon'></FiShoppingCart></Link>
                        <span>{productos.length}</span>
                    </div>
                    </li>
                    <li onClick={dropd}>
                        <Link onClick={arriba} to='/login'><FaUser></FaUser></Link>
                        </li>
                    </ul>
            </div>
        }
        </div>

        <div className='navigation_tools'>
            <div className='numeracion'>
                <Link to='/compra'><FiShoppingCart className='navigation_carrito_icon'></FiShoppingCart></Link>
                <span>{productos.length}</span>
            </div>
            <Link to='/login'><FaUser></FaUser></Link>
        </div>

    </div>
  )
}

export default NavBar