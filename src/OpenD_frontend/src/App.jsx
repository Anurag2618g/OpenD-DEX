import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from "/home-img.png";

function App() {
  return (
    <div className="App">
      <Header />
      <img className="bottom-space" src={homeImage} />
      <Footer />
    </div>
  );
}

export default App;
