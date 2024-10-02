import React from 'react'
import './HeaderNav.css'

const HeaderNav = () => {
  return (
    <div className="headerNav_wrapper">
        <div className="logo">
            <img src="https://static.tildacdn.com/tild3831-3766-4432-b034-643862663863/scale_1200_5.jpeg" />
        </div>
        <ul className='nav'>
            <li>Профиль</li>
            <li>Посты</li>
            <li>ЧАТ</li>
            <li>Выйти</li>
        </ul>
    </div>
    
    )
}

export default HeaderNav