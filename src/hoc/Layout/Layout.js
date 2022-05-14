import React, { Component } from 'react';
import style from './Layout.module.css'
import MenuToggle from '../../components/MenuToggle';
import Drawer from '../../components/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    menu: false
  }
  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }
  render () {
    return (
      <div className={style.layout}>
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <Drawer
          isOpen={this.state.menu}
          onClose={this.toggleMenuHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main>{ this.props.children }</main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}
export default connect(mapStateToProps)(Layout)
