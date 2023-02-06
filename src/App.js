import './App.css';
import Homepage from './components/homepage/Homepage';
import Login from './components/login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student_form from './components/StudentForm/studentform';
function App() {
  return (
    <BrowserRouter>
    <div className="App"> 
    <Routes>
      <Route path='/' element={<Homepage/> }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student_form' element={<Student_form/> }/>

    </Routes>
      {/* <Homepage/> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
