import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Cart } from './styles';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/logo.svg';

export default function Header() {
  const cartSize = useSelector((state) => state.cartReducer.length);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color={'#fff'} />
      </Cart>
    </Container>
  );
}
