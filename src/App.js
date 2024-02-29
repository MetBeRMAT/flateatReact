import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { atom } from 'jotai'; // Rimuovo l'import di useAtom perché non è più utilizzato
import Homepage from './component/Homepage/Homepage';
import Login from './component/User/Login';
import Navbar from './component/Navbar/Navbar';
import Register from './component/User/Register';
import AllRestaurants from './component/Restaurant/allRestaurant';
import RestaurantDetail from './component/Restaurant/RestaurantDetail';
import Cart from './component/Cart/Cart';
import LoggedRestaurant from './component/Restaurant/LoggedRestaurant';

export const currentUser = atom();

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='login' element={<Login />} />
          <Route path='restaurant' element={<AllRestaurants />} />
          <Route path='restaurantlogged' element={<LoggedRestaurant />} />
          <Route path='register' element={<Register />} />
          <Route path='restaurantdetail/:id' element={<RestaurantDetail />} />
          <Route path='cart' element={<Cart />} /> {/* Aggiungo la rotta per il carrello */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
