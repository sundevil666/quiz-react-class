import React from 'react';
import style from './MenuToggle.module.css';

const MenuToggle = props => {
  const cls = [
    style.MenuToggle
  ]
  if(props.isOpen) {
    cls.push(style.isOpen)
  } else {
    cls.push(style.isClose)
  }
  return (
    <i className={cls.join(' ')} onClick={props.onToggle}>
      {!props.isOpen ? 'Menu' : 'Close'}
    </i>
  )
}

export default MenuToggle;
