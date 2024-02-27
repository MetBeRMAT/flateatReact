import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='login' element={<Login />}> </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
