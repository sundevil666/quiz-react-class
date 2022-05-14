import React from 'react';
import style from './Select.module.css';

export default props => {
  const htmlFor = `${props.label}-${Math.random()}`

  return (
    <div className={style.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        { props.options.map((optionItem, index) => {
          return (
            <option value={optionItem.value} key={optionItem.value + index}>{optionItem.text}</option>
          )
        })}
      </select>
    </div>
  )
}
