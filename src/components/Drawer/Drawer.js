import React, { Component } from 'react';
import style from './Drawer.module.css';
import Backdrop from '../UI/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, i) => {
      return (
        <li key={link.id}>
          <NavLink
            exact={link.exact ? 'exact' : null}
            to={link.path}
            onClick={this.clickHandler}
          >
            {link.name}
          </NavLink>
        </li>
      )
    })
  }

  render () {
    const cls = [style.Drawer]
    if (!this.props.isOpen) {
      cls.push(style.close)
    }
    const links = [
      { id: 1, path: '/', name: 'Home', exact: true },
    ]

    if(this.props.isAuthenticated) {
      links.push({ id: 3, path: '/quiz-creator', name: 'Quiz creator', exact: false })
      links.push({ id: 4, path: '/logout', name: 'Logout', exact: false })
    } else {
      links.push({ id: 4, path: '/auth', name: 'Auth', exact: false })
    }

    return (
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
      </>
    )
  }
}

export default Drawer;
