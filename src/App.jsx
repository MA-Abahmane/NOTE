import Login from "./components/Login";
import NotePage from "./components/NotePage";
import { useEffect, useState } from "react";
import Watch from "./components/Watch"; 

import "./App.css"

function App() {
  const [isConect, setisConect] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(
    ()=>{
      token ? setisConect(true):setisConect(false);
    },[token]
  )

  return (
    <>
    <Watch />
    <div>{isConect ? <NotePage setisConect={setisConect}/> : <Login setisConect={setisConect} />}</div>
    </>
  );
}

export default App;
