import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { currentCart, currentOpenCart, currentUser } from '../../App';

export default function DishCard(props) {
  const [cartItems, setCartItems] = useAtom(currentCart);
  const [isCartOpen, setIsCartOpen] = useAtom(currentOpenCart);
  const [user] = useAtom(currentUser);

  const addToCart = () => {
    const newItem = {
      id: props.id,
      name: props.name,
      category: props.category,
      price: props.price,
      quantity: 1
    };

    const existingItem = cartItems.findIndex(item => item.name === props.name);

    if (existingItem !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItem].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const refItem = useRef(null);

  return (
    <div className="card card-container" style={{ position: 'relative', height: 'auto' }}>
      <RandomPhoto /> {/* Genera casualmente una foto */}
      <div className="card-body" style={{ backgroundColor: '#fff' }}>
        <h1 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px' }}>
          {props.name}
        </h1>
        <div className="d-flex justify-content-between align-items-center">
          {user ? (
            <button type="button" className="btn btn-danger" ref={refItem} onClick={addToCart}>
              Ordina ora
            </button>
          ) : (
            <button type="button" className="btn btn-danger disabled" ref={refItem} onClick={addToCart}>
              Ordina ora
            </button>
          )}
        </div>
      </div>
      <div className="status-info" style={{ position: 'absolute', bottom: '0px', right: '3px', padding: '1px' }}>
        <h3 style={{ fontSize: '1.3rem' }}>
          {props.price}&euro;
        </h3>
      </div>
    </div>
  );
}

// Funzione per generare casualmente una foto
function RandomPhoto() {
  const imageUrls = [
    'https://www.cucchiaio.it/content/dam/cucchiaio/it/ricette/2009/11/ricetta-panna-cotta/panna%20cotta-1.jpg',
    'https://www.giallozafferano.it/images/173-17354/Tiramisu_650x433_wm.jpg',
    'https://www.giallozafferano.it/images/254-25433/Filetto-di-salmone-in-padella_780x520_wm.jpg',
    'https://www.cucchiaio.it/content/cucchiaio/it/ricette/2015/06/bistecca-alla-fiorentina/jcr:content/header-par/image-single.img10.jpg/1435051850020.jpg',
    'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg',
    'https://blog.giallozafferano.it/ricettepanedolci/wp-content/uploads/2020/10/risotto-ai-funghi-1-720x480.jpeg',
  ];

  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <img className="card-img-top" src={randomImageUrl} alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
  );
}
