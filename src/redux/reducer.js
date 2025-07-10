// store/actions.js
import axios from 'axios';

const API_URL ="http://127.0.0.1:8000"
// process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const fetchData = (target) => async (dispatch) => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.get(`${API_URL}/${target}/`);
            dispatch({ type: "SUCCESS", payload: response.data });
        } catch (error) {
            dispatch({ type: "FAILURE", error });
        }
};

export const fetchInfoPost = (obj) => async (dispatch) => {
        dispatch({ type: "LOADING" });
        try {
            const url = `${API_URL}/users/`;
            const response = await axios.post(url, obj);
            dispatch({type: "SUCCESS", data: response.data})
        } catch (error) {
           dispatch({ type: "FAILURE", error });
        }
    };

export const fetchProductPost = (obj) => async (dispatch) => {
        dispatch({ type: "LOADING" });
        try {
            const url = `${API_URL}/products/`;
            const response = await axios.post(url, obj);
            dispatch({type: "SUCCESS", data: response.data})
        } catch (error) {
           dispatch({ type: "FAILURE", error });
        }
    };



const initialViewState = {
    loading: false,
    data: [],
    error: null,
};

const viewReducer = (state = initialViewState, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true, error: null };
        case "SUCCESS":
            return { ...state, loading: false, data: action.payload };
        case "FAILURE":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default viewReducer;


