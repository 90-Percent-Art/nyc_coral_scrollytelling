import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollBody from "./ScrollBody";
import "./App.css";

const App = () => {

    return (
      <div>
        <Header />
        <ScrollBody />
        <Footer />
      </div>
    );
}

export default App;
