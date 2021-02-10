import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-nike-downshifter-10-masculino/26/HZM-3549-026/HZM-3549-026_zoom1.jpg?ts=1584659244&ims=326x"
          alt="Tênis"
        />
        <strong>Tênis</strong>
        <span>R$ 111.00</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={19} color="#333" />
          </div>
        </button>
      </li>
    </ProductList>
  );
}
