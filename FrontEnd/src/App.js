
import './App.css';
import Navbar from './components/Navbar';
import Notestate from './context/Notes/Notestate';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  return (

    <Notestate>
      <Router>

      <Navbar />
      {/* <div className="container justify-content-center align-items-center"> */}
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        {/* <Route exact path='/about' element={< About />}></Route> */}
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
      </Routes>


      {/* </div> */}
      <Footer/>
      </Router>
    </Notestate>



  );
}

export default App;
