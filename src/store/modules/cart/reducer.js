import produce from 'immer';

const INITIAL_STATE = [];

const cart = produce((state, action) => {
  let productIndex;
  switch (action.type) {
    case '@cart/ADD':
      productIndex = state.findIndex(
        (product) => product.id === action.product.id
      );
      if (productIndex >= 0) {
        state[productIndex].amount++;
      } else {
        state.push({ ...action.product, amount: 1 });
      }
      break;
    case '@cart/REMOVE':
      productIndex = state.findIndex((product) => product.id === action.id);
      if (productIndex >= 0) {
        state.splice(productIndex, 1);
      }
      break;
  }
}, INITIAL_STATE);

export default cart;
