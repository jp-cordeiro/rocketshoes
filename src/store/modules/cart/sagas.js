import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';
import { formatPrice } from '../../../utils/format';

function* addToCart({ id }) {
  try {
    const productExists = yield select((state) =>
      state.cartReducer.find((product) => product.id === id)
    );
    if (productExists) {
      const amount = productExists.amount + 1;
      yield put(updateAmount(id, amount));
    } else {
      const response = yield call(api.get, `/products/${id}`);
      const product = {
        ...response.data,
        amount: 1,
        priceFormated: formatPrice(response.data.price),
      };
      yield put(addToCartSuccess(product));
    }
  } catch (error) {
    console.log(error.response);
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
