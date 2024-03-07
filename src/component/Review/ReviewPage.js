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

  function postReview() {
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
    .catch(error => {
      console.error("Errore durante il post della recensione:", error);
      // Gestione degli errori, se necessario
    });
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Reviews</h1>
      <div className="row">
        {reviews && reviews.map((review, index) => (
          <div key={index} className="col-sm-4 mb-4">
            <ReviewCard score={review.vote} comment={review.note} userName={user.mail}/>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3>Aggiungi una nuova recensione</h3>
        <div className="mb-2">
          <label htmlFor="vote">Vote:</label>
          <input
            type="number"
            id="vote"
            name="vote"
            ref={inVote}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="note">Comment:</label>
          <textarea
            id="note"
            name="note"
            ref={inNote}
          />
        </div>
        <button className="btn btn-primary" onClick={postReview}>
          Aggiungi Recensione
        </button>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" type="button">
          <Link className="text-white" to={`/restaurantlogged`}>
            Torna al Ristorante
          </Link>
        </button>
      </div>
    </div>
  );
}
