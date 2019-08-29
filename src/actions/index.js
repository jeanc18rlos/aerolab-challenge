import {

  FETCH_USER,
  ADD_POINTS,
  FETCH_HISTO,
  POST_REDEEM,
  USER_REQUEST_ERROR,
  FETCH_PRODUCTS,
  PRODUCTS_REQUEST_ERROR

} from './types';
import axios from 'axios';
import { toast } from "react-toastify"


const apiUrl = process.env.GATSBY_API_URL;

const headers = {
  'Authorization': `Bearer ${process.env.GATSBY_API_TOKEN}`,
  'Content-type': 'application/json',
  'Accept': 'application/json'
}

// User

/**
 * @name fetchUser
 * @description Get user data
 */
export const fetchUser = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/user/me`, { headers })
      .then(response => {
        dispatch(fetchUserSuccess(response.data))
        toast.success(`welcome back ${response.data.name}`);
      })
      .catch(error => {
        dispatch(userRequestError(error.toString()))
        toast.error('User ' + error.toString(), { autoClose: false });
      });
  };
}
const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER,
    payload: {
      user: data,
    }
  }
};
const userRequestError = (error) => {
  return {
    type: USER_REQUEST_ERROR,
    payload: {
      user: {
        error
      },
    }
  }
};
/**
 * @name addPoints
 * @description add points to the user
 */
export const addPoints = (amount) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/user/points`, {

      amount

    }, { headers })
      .then(response => {
        dispatch(fetchPointsSuccess(response.data["New Points"]))
        toast.success(`welcome back ${response.data.message}`);
      })
      .catch(error => {
        dispatch(userRequestError(error.toString()))
        toast.error('Add Points ' + error.toString(), { autoClose: false });
      });
  };
}
const fetchPointsSuccess = (data) => {
  return {
    type: ADD_POINTS,
    payload: {
      user: {
        points: data
      }
    }
  }
};
/**
 * @name redeemProduct
 * @description add points to the user
 */
export const redeemProduct = (product) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/redeem`, {

      productId: product.id

    }, { headers })
      .then(response => {
        dispatch(redeemProductSuccess(product.cost))
        toast.success(`${response.data.message}`);
      })
      .catch(error => {
        dispatch(userRequestError(error.toString()))
        toast.error('Redeem ' + error.toString(), { autoClose: false });
      });
  };
}
const redeemProductSuccess = (data) => {
  return {
    type: POST_REDEEM,
    payload: {
      user: {
        points: data
      }
    }
  }
};
// Products
/**
 * @name fetchProducts
 * @description fetch the products
 */
export const fetchProducts = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/products`, { headers })
      .then(response => {
        dispatch(fetchProductsSuccess(response.data))
        toast.success(`All products were succesfully loaded!`);
      })
      .catch(error => {
        dispatch(productsRequestError(error.toString()))
        toast.error('Products ' + error.toString(), { autoClose: false });
      });
  };
}
const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS,
    payload: {
      products: data,
    }
  }
};
const productsRequestError = (error) => {
  return {
    type: PRODUCTS_REQUEST_ERROR,
    payload: {
      products: {
        error
      },
    }
  }

}