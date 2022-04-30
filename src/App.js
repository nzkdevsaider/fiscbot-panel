import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Navbar from "./comps/Navbar";
import Home from "./views/Home";
import theme from "./assets/theme";
import { Routes, Route } from "react-router-dom";
import UserPage from "./views/UserPage";
import { UserProvider } from "./context/UserProvider";
import UserFetch from "./hooks/UserFetch";
import VerifyPage from "./views/VerifyPage";
import NotFound from "./views/NotFound";
import React from "react";

function App() {
  const { user, error, loading } = UserFetch();

  return (
    <ThemeProvider theme={theme}>
      <UserProvider.Provider
        value={user}
      >
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {user ? (
              <>
                <Route path="/user" element={<UserPage />} />{" "}
                <Route path="/verificar" element={<VerifyPage />} />
              </>
            ) : (
              ""
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserProvider.Provider>
    </ThemeProvider>
  );
}

export default App;
