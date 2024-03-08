import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { useAtom } from 'jotai';
import { currentRestaurant, currentUser } from '../../App';

export default function ReviewPageNoLogin() {
  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const { restaurantId, userId } = useParams();
  const [reviews, setReviews] = useState([]);


  useEffect(
    () => {
      axios.get("/restaurants/" + restaurantId).then(
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
    }
  );

  const inVote = useRef(null);
  const inNote = useRef(null);

  function postReview() {
    newReview.vote = inVote.current.value;
    newReview.note = inNote.current.value;
    newReview.restaurant_id = restaurant.id;

    setReviews()
    axios.post("/reviews/").then(
      (response) =>
        setReviews(...reviews, response.data),
      setNewReview({
        vote: 0,
        note: '',
        restaurant_id: ""
      })
    )
  }

  return (
    <div style={{ background: 'linear-gradient(to right, #ffffff, #154360)', minHeight: 'calc(100vh)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
  <Link to={`/restaurant`} style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: 'white' }}>
    <button className="btn btn-primary rounded-pill" style={{ backgroundColor: '#ff6347', border: 'none' }}>
      Torna al Ristorante
    </button>
  </Link>

  <div style={{ marginTop: '5vh', width: '50%' }}> {/* Imposta la larghezza del contenitore delle recensioni al 50% della larghezza della pagina */}
    <h1 className="text-center mb-5" style={{ fontSize: '3rem', marginLeft: '600px' }}>Reviews</h1>
    <h1 style={{ marginRight: '100px', textAlign: 'left' }}>{restaurant.name}'s Restaurant</h1> {/* Aggiunto textAlign: 'left' per allineare il testo a sinistra */}
    <div className="row" style={{ justifyContent: 'center' }}> {/* Centra le recensioni nella pagina */}
      {reviews && reviews.map((review, index) => (
        <div key={index} className="col-12 mb-4" style={{ marginRight: '350px' }}> {/* Aggiunto margine sinistro per spostare la ReviewCard a sinistra */}
          <ReviewCard score={review.vote} comment={review.note} style={{ width: '100%' }} /> {/* Imposta la larghezza di ogni recensione al 100% della larghezza del contenitore */}
        </div>
      ))}
    </div>
  </div>
</div>







  );
}
