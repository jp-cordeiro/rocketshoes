import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  try {
    const response = yield call(api.get, `/products/${id}`);
    const product = response.data;
    console.log(response);
    yield put(addToCartSuccess(product));
  } catch (error) {
    console.log(error.response);
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
