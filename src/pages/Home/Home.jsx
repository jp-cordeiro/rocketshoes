import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrince } from '../../utils/format';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then(({ data }) => {
      const products = data.map((product) => {
        return {
          ...product,
          priceFormatted: formatPrince(product.price),
        };
      });
      setProducts(products);
    });
  }, []);

  const handleAddProduct = (product) => {
    addToCart(product);
  };

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={19} color="#333" />
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
