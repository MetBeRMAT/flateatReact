import React from 'react';
import { currentRestaurant, currentUser } from '../../App';
import { atom, useAtom } from 'jotai';

export default function ReviewCard({ score, comment, userName }) {

  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [user, setUser] = useAtom(currentUser);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < score; i++) {
      stars.push('★'); // Aggiunge una stella al vettore per ogni voto
    }
    return stars.join(''); // Unisce tutte le stelle in una stringa
  };

  return (
    <div className="card" style={{ maxWidth: "81%" }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src="https://st4.depositphotos.com/3538103/40645/v/450/depositphotos_406455892-stock-illustration-user-icon-vector-people-icon.jpg" alt="User Icon" style={{ width: '30px', height: '30px' }} />
          <div style={{ marginRight: '10px', marginLeft: '10px' }}>{renderStars()}</div>
        </div>
        <p style={{ margin: '0', textAlign: 'left', fontWeight: 'bold' }}>User: {userName}</p> {/* Posiziona User sotto renderStars */}
        <p style={{ margin: '0', textAlign: 'left', marginTop: "20px" }}>{comment}</p> {/* Posiziona il commento sotto l'utente */}
      </div>
    </div>
  );
}
