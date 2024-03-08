import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { useAtom } from 'jotai';
import { currentRestaurant, currentUser } from '../../App';

export default function ReviewPage() {
  let navigate = useNavigate();
  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [user, setUser] = useAtom(currentUser);
  const { restaurantId, userId } = useParams();
  const [reviews, setReviews] = useState([]);


  useEffect(
    () => {
      axios.get("/restaurant/" + restaurantId + "/" + user.id).then(
        (response) => {
          setRestaurant(response.data);
        }
      );
      axios.get("/reviews/" + restaurantId).then(
        (response) => {
          setReviews(response.data);
        }
      );
    },
    []
  )

  const [newReview, setNewReview] = useState(
    {
      vote: 0,
      note: "",
      restaurant_id: '',
      user_id: user.id
    }
  );

  const inVote = useRef(null);
  const inNote = useRef(null);

  function postReview() 
  {
    newReview.vote = inVote.current.value;
    newReview.note = inNote.current.value;

    setReviews()
    axios.post("/reviews/" + restaurantId + "/" + user.id, newReview)
      .then(response => {
        setReviews([...reviews, response.data]); // Aggiungi la nuova recensione allo stato delle recensioni
        setNewReview({ // Resetta il form
          vote: 0,
          note: '',
        });
        navigate("/restaurantlogged"); // Reindirizza dopo l'aggiunta della recensione
      })
  }

  return (

    <div style={{ background: 'linear-gradient(to right, #ffffff, #154360)', minHeight: 'calc(100vh)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      <Link to={`/restaurantlogged`} style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: 'white' }}>
        <button className="btn btn-primary rounded-pill" style={{ backgroundColor: '#ff6347', border: 'none' }}>
          Torna al Ristorante
        </button>
      </Link>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}> {/* Utilizza justifyContent: 'space-between' per spingere i due elementi ai margini */}
        <div style={{ width: '70%', marginLeft: '20px' }}> {/* Imposta la larghezza del contenitore delle recensioni e aggiunge il margine sinistro */}
          <h1 className="text-center mb-5" style={{ fontSize: '3rem', marginLeft: "500px", marginTop: "80px" }}>Reviews</h1>
          <h1 style={{ textAlign: 'left' }}>{restaurant.name}'s Restaurant</h1> {/* Aggiunto textAlign: 'left' per allineare il testo a sinistra */}
          <div className="row" style={{ justifyContent: 'center' }}> {/* Centra le recensioni nella pagina */}
            {reviews && reviews.map((review, index) => (
              <div key={index} className="col-12 mb-4"> {/* Rimossa la specifica del margine */}
                <ReviewCard score={review.vote} comment={review.note} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '30%', marginLeft: '20px', marginTop: "180px" }}> {/* Imposta la larghezza del filtro e aggiungi il margine sinistro */}
          <div className="mb-4">
            <h3 style={{ marginTop: '10px', marginBottom: '20px', color:"white" }}>Aggiungi una nuova recensione</h3> {/* Allineato l'h3 con il titolo sopra */}
            <div className="mb-2">
              <label htmlFor="vote" style={{ fontSize: '1.2rem', marginTop: '30px',marginRight:"20px" }}>Vote</label> {/* Imposta la dimensione del font per Vote */}
              <input
                type="number"
                id="vote"
                name="vote"
                ref={inVote}
                min="1" // Imposta il valore minimo a 1
                max="10" // Imposta il valore massimo a 10
                style={{ fontSize: '1.2rem', width: '4rem', marginRight: '270px' }} // Imposta la dimensione del font per il numero e rimuovi il margine sinistro
              />
            </div>
            <div className="mb-2">
              <label htmlFor="comment" style={{ fontSize: '1.2rem', marginRight: '310px', marginTop: '30px' }}>Comment</label> {/* Imposta la dimensione del font per Comment */}
              <textarea
                id="comment"
                name="comment"
                ref={inNote}
                style={{ fontSize: '1.2rem', width: '80%', minHeight: '100px', marginTop: '10px' }} // Imposta la dimensione del font per la textarea, la larghezza al 100% e il margine superiore
              />
            </div>
            <button className="btn btn-danger rounded-pill" onClick={postReview} style={{ fontSize: '1.2rem' }}> {/* Imposta la dimensione del font per il pulsante e il colore rosso */}
              Aggiungi Recensione
            </button>
          </div>
        </div>


      </div>
    </div>


  );
}
