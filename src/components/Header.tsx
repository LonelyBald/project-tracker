import React from 'react';
import '../scss/header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <span className="header__logo">PROJECT TRACKER</span>
        </Link>
        <span className="header__popup">Projects</span>
      </div>
    </div>
  );
};
