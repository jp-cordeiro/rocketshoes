import produce from 'immer';

const INITIAL_STATE = [];

const cart = produce((state, action) => {
  let productIndex;
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      const { product } = action;
      state.push(product);
      break;
    case '@cart/REMOVE':
      productIndex = state.findIndex((product) => product.id === action.id);
      if (productIndex >= 0) {
        state.splice(productIndex, 1);
      }
      break;
    case '@cart/UPDATE_AMOUNT':
      if (action.amount <= 0) {
        return;
      }
      productIndex = state.findIndex((product) => product.id === action.id);
      if (productIndex >= 0) {
        state[productIndex].amount = Number(action.amount);
      }
      break;
  }
}, INITIAL_STATE);

export default cart;
