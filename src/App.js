import './App.css';
import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login'
import Register from './components/register/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App"> 
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student_form' element={<Register/>}/>

    </Routes>
      {/* <Homepage/> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
