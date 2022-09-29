import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Login } from "./Login";
import { Content } from "./Content";

function App() {
  const [userID, setUserID] = useState<number>(-1);

  return (
    <>
      <title>Serwis ogloszeniowy - aplikacja webowa</title>
      {userID === -1 ? (
        <Login setUID={(n: number) => setUserID(n)} />
      ) : userID === 0 ? (
        <Content editable={true} />
      ) : (
        <Content />
      )}
    </>
  );
}

export default App;
