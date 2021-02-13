import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';
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
