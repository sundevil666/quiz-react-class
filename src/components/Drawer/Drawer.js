import React, { Component } from 'react';
import style from './Drawer.module.css';

const links = [
  1, 2, 3
]

class Drawer extends Component {
  renderLinks() {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <a href="#">Link {link}</a>
        </li>
      )
    })
  }

  render () {
    return (
      <nav className={style.Drawer}>
        <ul>
          {this.renderLinks}
        </ul>
      </nav>
    )
  }
}

export default Drawer;
