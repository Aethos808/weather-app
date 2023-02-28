import "./App.css";

import React from "react";

import { useAppHooks } from "./AppHooks";

function App() {
  const { weatherAPIResponse } = useAppHooks("02145");
  console.log(weatherAPIResponse);
  return <div className="App">hello</div>;
}

export default App;
