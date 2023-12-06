import React from 'react';
import './Button.css';

export function Button({ buttonTitle, onClickHandler, icon }) {
  return (
    <button 
        className='Button-style'
        onClick={onClickHandler}
    >
        {icon}
        {buttonTitle}
    </button>
  )
}