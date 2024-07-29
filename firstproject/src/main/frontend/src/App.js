import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./pages/header";

function App() {
/*  const [message, setMessage] = useState("");

   // useEffect(함수, 배열) : 컴포넌트가 화면에 나타났을 때 자동 실행
   useEffect(() => {
     // fetch(url, options) : Http 요청 함수
     fetch("/react")
       .then(response => response.text())
       .then(message => {
         setMessage(message);
       });
   }, [])*/
  return (
          <Routes>
            <Route exact path="/">
                <Header/>
            </Route>
           </Routes>
  );
}

export default App;
