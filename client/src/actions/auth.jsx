import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, AUTHENTICATED, NOT_AUTHENTICATED, SIGNUP_SUCCESS, SIGNUP_FAIL, EMAIL_ERROR, PASSWORD_ERROR } from "./types";
import axios from "axios";
import { API_URL } from "../config";
import { useState } from "react";

const LOCALHOST = `${API_URL}`;

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(`${LOCALHOST}/auth/jwt/verify/`, body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED,
        });
      } else {
        dispatch({
          type: NOT_AUTHENTICATED,
        });
      }
    } catch (err) {
      dispatch({
        type: NOT_AUTHENTICATED,
      });
    }
  } else {
    dispatch({
      type: NOT_AUTHENTICATED,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(`${LOCALHOST}/auth/users/me/`, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password, setError) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  console.log(email, password);
  try {
    const res = await axios.post(`${LOCALHOST}/auth/jwt/create/`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    console.log("SUCCESS LOGIN");
    dispatch(loadUser());
  } catch (err) {
    console.log("NOT A SUCCESS LOGIN");
    // console.log(err.response.data.detail);
    console.log(err);
    setError(err.response.data.detail);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const registerUser = (username, email, password, re_password, isRegistered) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password, re_password });
  console.log("SUCCESS REG RUN");
  try {
    const res = await axios.post(`${LOCALHOST}/auth/users/`, body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    console.log("SUCCESS REG");

    isRegistered(true);
  } catch (err) {
    console.log(err.response.data);
    const errorMessage = formatErrorMessage(err);
    // dispatch();
    dispatch({
      type: SIGNUP_FAIL,
      payload: errorMessage,
    });
  }
};

export function formatErrorMessage(errormsg) {
  switch (errormsg) {
    case errormsg.response.data.email:
      return "Email is already in use";
    case errormsg.response.data.password:
      return "Password must be at least 8 characters";
    case errormsg.response.data.non_field_errors:
      return "Passwords do not match";
    default:
      return "Something went wrong";
  }
}

export function signUpFailed(message) {
  return {
    type: SIGNUP_FAIL,
    payload: message,
  };
}
