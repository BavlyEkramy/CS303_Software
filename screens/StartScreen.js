import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import Welcome from "../app/home/Welcome";

const StartScreen = () => {
  const [loading, setLoading] = useState(true);
  return loading ? <SplashScreen setLoading={setLoading} /> : <Welcome />;
};

export default StartScreen;
