// import { PHOTO_GET } from '../Api';

const FETCH_CEP_STARTED = "cep/fetchStarted";
const FETCH_CEP_SUCCESS = "cep/fetchSuccess";
const FETCH_CEP_FAILED = "cep/fetchFailed";
const RESET_DATA = "cep/resetData";

// Actions
const fetchCepStarted = () => ({
  type: FETCH_CEP_STARTED,
});

const fetchCepSuccess = (data) => ({
  type: FETCH_CEP_SUCCESS,
  payload: data,
});

const fetchCepFailed = (error) => ({
  type: FETCH_CEP_FAILED,
  payload: error,
});

export const resetData = (error) => ({
  type: FETCH_CEP_FAILED,
});

// Reducer
const initialState = {
  loading: false,
  error: null,
  data: null,
};

export default function cep(state = initialState, action) {
  switch (action.type) {
    case FETCH_CEP_STARTED:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case FETCH_CEP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_CEP_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case RESET_DATA:
      return {
        ...state,
        loading: false,
        data: null,
        error: null,
      };

    default:
      return state;
  }
}

// Async Actions
export const fetchCep = (cep) => async (dispatch) => {
  try {
    dispatch(fetchCepStarted());

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (response.ok === false) throw new Error(data.message);
    
    dispatch(fetchCepSuccess(data));
  } catch (error) {
    dispatch(fetchCepFailed(error.message));
  }
};
