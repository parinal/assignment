const vars = {
  REACT_APP_CLIENT_ID: "f7190371b5eced9fb9a0",
  REACT_APP_CLIENT_SECRET: "e6dff5cf0c6d04998023e87c063219d493ccfae6",
  REACT_APP_REDIRECT_URI: "http://localhost:3000/login",
  REACT_APP_PROXY_URL: "http://localhost:5000/authenticate",
  REACT_APP_SERVER_PORT: 5000,
};

export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  client_id: vars.REACT_APP_CLIENT_ID,
  redirect_uri: vars.REACT_APP_REDIRECT_URI,
  client_secret: vars.REACT_APP_CLIENT_SECRET,
  proxy_url: vars.REACT_APP_PROXY_URL,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
