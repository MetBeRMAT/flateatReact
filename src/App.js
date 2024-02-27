import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { atom, useAtom } from 'jotai';
import Homepage from './component/Homepage/Homepage';
import Login from './component/User/Login';
import Navbar from './component/Navbar/Navbar';
import Register from './component/User/Register';
import AllRestaurants from './component/Restaurant/allRestaurant';

export const currentUser = atom();

function App() 
{

  //const [user,setUser] = useAtom(currentUser);

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path='login' element={<Login />}> </Route>
            {/* <Route path='restaurant' element={<AllRestaurants />}> </Route> */}
            <Route path='register' element={<Register />}> </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
