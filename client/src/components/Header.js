import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Experiments
          </a>
          <ul className="right">
            <a>Google Login</a>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
