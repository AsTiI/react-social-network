import React from 'react'
import './Button.css'

interface ButtonComponentProps {
    type?: 'button'|'submit'|'reset';
    value:string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>
}

const Button: React.FC<ButtonComponentProps> = ({type='button', value, className, onClick}) => {
    
  return (
    <input className={'default_btn '+className} type={type} value={value} onClick={onClick} />
  )
}

export default Button