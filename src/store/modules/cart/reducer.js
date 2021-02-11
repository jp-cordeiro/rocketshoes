import produce from 'immer';

const INITIAL_STATE = [];

const cart = produce((state, action) => {
  let productIndex;
  switch (action.type) {
    case 'ADD_TO_CART':
      productIndex = state.findIndex(
        (product) => product.id === action.product.id
      );
      if (productIndex >= 0) {
        state[productIndex].amount++;
      } else {
        state.push({ ...action.product, amount: 1 });
      }
      break;
    case 'REMOVE_FROM_CART':
      productIndex = state.findIndex((product) => product.id === action.id);
      console.log(productIndex);
      if (productIndex >= 0) {
        state.splice(productIndex, 1);
      }
      break;
  }
}, INITIAL_STATE);

export default cart;
