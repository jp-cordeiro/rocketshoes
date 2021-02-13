import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';

function Home({ addToCartRequest, amount }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then(({ data }) => {
      const products = data.map((product) => {
        return {
          ...product,
          priceFormatted: formatPrice(product.price),
        };
      });
      setProducts(products);
    });
  }, []);

  const handleAddProduct = (productId) => {
    addToCartRequest(productId);
  };

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={19} color="#333" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = (state) => ({
  amount: state.cartReducer.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
