import React from 'react';

import { Container,Cart } from './styles';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <Container>
      <Link>
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart>
        <div>
          <strong>Meu carrinho</strong>
          <span>itens</span>
        </div>
        <MdShoppingBasket size={36} color={'#fff'} />
      </Cart>
    </Container>
  );
}