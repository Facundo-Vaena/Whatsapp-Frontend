import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import QrLogin from "./components/QrLogin";
import SessionData from "./components/SessionData";
import { UserContext } from "./context";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const [instanceId, setInstanceId] = useState("no hay socket");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserContext.Provider value={{ instanceId, setInstanceId }}><QrLogin /></UserContext.Provider>} />
        <Route
          path="/session"
          element={
            <UserContext.Provider value={{ instanceId, setInstanceId }}>
              <SessionData />
            </UserContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
