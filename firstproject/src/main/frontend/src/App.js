import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom";
import Header from "./pages/header";
import Footer from "./pages/footer";
import Body from "./pages/body";
import Show from "./pages/show";


function App() {
  return (
       <>
          <Header/>
            <Routes>
                <Route exact path="/" element = <Body/>></Route>
                <Route exact path="/:id" element = <Show/> ></Route>
            </Routes>
          <Footer/>
       </>
  );
}

export default App;
