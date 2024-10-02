import React from 'react'
import './InputBtn.css'

interface ButtonComponentProps {
    value:string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputBtn: React.FC<ButtonComponentProps> = ({ value, className, onChange}) => {
  return (
    // style={{width: `${value.length+10}ch`, transition: 'width 0.2s',}}
    <input  className={'input_btn '+className} type="text" value={value} onChange={onChange} />
  )
}

export default InputBtn