import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
