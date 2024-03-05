import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { atom, useAtom } from 'jotai'; // Rimuovo l'import di useAtom perché non è più utilizzato
import Homepage from './component/Homepage/Homepage';
import Login from './component/User/Login';
import Navbar from './component/Navbar/Navbar';
import Register from './component/User/Register';
import AllRestaurants from './component/Restaurant/allRestaurant';
import RestaurantDetail from './component/Restaurant/RestaurantDetail';
import Cart from './component/Cart/Cart';
import LoggedRestaurant from './component/Restaurant/LoggedRestaurant';
import RestaurantDetailNoLogin from './component/Restaurant/RestaurantDetailNoLogin';
import DeliveryPage from './component/Buy/DeliveryPage';
import CheckoutOrder from './component/Buy/CheckoutOrder';
import { popper } from "@popperjs/core";
import ReviewPage from './component/Review/ReviewPage';
import RestaurantCard from './component/Restaurant/RestaurantCard';



export const currentUser = atom();
export const currentCart = atom([]);
export const currentRestaurant = atom();
export const currentPrice = atom();

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
            <Route path='restaurant' element={<AllRestaurants />}> </Route>
            {/* <Route index element={<Cart />}></Route> */}
            <Route path='deliverypage' element={<DeliveryPage/>}> </Route>
            
            <Route path='restaurantlogged' element={<LoggedRestaurant/>}> </Route>
            <Route path='register' element={<Register />}> </Route>
            <Route path='restaurantdetail/:restaurantId/:userId' element={<RestaurantDetail />}> </Route>
            <Route path='restaurantdetail/:id' element={<RestaurantDetailNoLogin />}> </Route>
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<CheckoutOrder/>}> </Route>            
            <Route path='reviewpage' element={<ReviewPage/>}> </Route>


          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
