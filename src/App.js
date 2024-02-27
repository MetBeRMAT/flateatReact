import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.css';
import Restaurant from './Restaurant';
import { atom, useAtom } from 'jotai';

export const currentUser = atom();

function App() 
{

  //const [user,setUser] = useAtom(currentUser);

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='login' element={<Login />}> </Route>
            <Route path='restaurant' element={<Restaurant />}> </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
