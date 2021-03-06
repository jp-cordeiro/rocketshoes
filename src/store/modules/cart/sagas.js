import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../utils/format';
import { toast } from 'react-toastify';

function* addToCart({ id }) {
  try {
    const productExists = yield select((state) =>
      state.cartReducer.find((product) => product.id === id)
    );

    const stock = yield call(api.get, `/stock/${id}`);
    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora de estoque.');
      return;
    }

    if (productExists) {
      yield put(updateAmountSuccess(id, amount));
    } else {
      const response = yield call(api.get, `/products/${id}`);
      const product = {
        ...response.data,
        amount: 1,
        priceFormated: formatPrice(response.data.price),
      };
      yield put(addToCartSuccess(product));

      history.push('/cart');
    }
  } catch (error) {
    console.log(error.response);
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    return;
  }
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque.');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
