import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrince } from '../../utils/format';
import { ProductList } from './styles';

function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then(({ data }) => {
      const products = data.map((product) => {
        return {
          ...product,
          priceFormated: formatPrince(product.price),
        };
      });
      setProducts(products);
    });
  }, [props]);

  const handleAddProduct = (product) => {
    const { dispatch } = props;
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>

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

export default connect()(Home);
