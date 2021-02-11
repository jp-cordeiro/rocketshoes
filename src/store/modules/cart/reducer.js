import produce from 'immer';

const INITIAL_STATE = [];

const cart = produce((state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      state.push({ ...action.product, amount: 1 });
      break;
  }
}, INITIAL_STATE);

export default cart;
