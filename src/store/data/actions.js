import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_IS_NOTIFICATIONS_ENABLED,
  SET_IS_ONBOARDING_VIEWED,
  SET_CART,
  SET_COFFEESHOP,
  SET_COFFEESHOPS,
} from "./actionTypes.js";

export const setColorScheme = (inputData) => ({
  type: SET_COLOR_SCHEME,
  payload: {
    data: inputData,
  },
});
export const setSnackbar = (inputData) => ({
  type: SET_SNACKBAR,
  payload: {
    data: inputData,
  },
});
export const setIsOnboardingViewed = (inputData) => ({
  type: SET_IS_ONBOARDING_VIEWED,
  payload: {
    data: inputData,
  },
});
export const setIsNotificationsEnabled = (inputData) => ({
  type: SET_IS_NOTIFICATIONS_ENABLED,
  payload: {
    data: inputData,
  },
});

export const setCart = (inputData) => ({
  type: SET_CART,
  payload: {
    data: inputData,
  },
});

export const setCoffeeshop = (inputData) => ({
  type: SET_COFFEESHOP,
  payload: {
    data: inputData,
  },
});

export const setCoffeeshops = (inputData) => ({
  type: SET_COFFEESHOPS,
  payload: {
    data: inputData,
  },
});
