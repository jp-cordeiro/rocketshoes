import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrince } from '../../utils/format';
import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then(({ data }) => {
      const products = data.map((product) => {
        return {
          ...product,
          priceFormated: formatPrince(product.price),
        };
      });
      console.log(products);
      setProducts(products);
    });
  }, []);

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>
          <button type="button">
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
