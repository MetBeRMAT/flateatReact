import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { useAtom } from 'jotai';
import { currentRestaurant, currentUser } from '../../App';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState(
      { 
        vote: 0, 
        note: "",
        restaurant_id: restaurant.id,
        user_id: user.id
      }
    );
  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [user, setUser] = useAtom(currentUser);
  const { restaurantId, userId } = useParams();

  useEffect(
    ()=>
    {
            axios.get("/restaurant/"+restaurantId+"/"+user.id).then(
                (response)=>
                {
                    setRestaurant(response.data);
                }
            );
            axios.get("/reviews/"+restaurantId).then(
                (response)=>
                {
                    setReviews(response.data);
                }
            );
    },
    []
)

 const inVote = useRef(null);
 const inNote = useRef(null);

  function postReview()
  {
    newReview.vote = inVote.current.value;
    newReview.note = inNote.current.value;
    newReview.restaurant_id = restaurant.id;

    setReviews()
    axios.post("/reviews", newReview).then(
      (response)=>
      setReviews(...reviews, response.data),
      setNewReview({
        vote: 0, 
        note: '',
        restaurant_id: ""
      })
    )
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Reviews</h1>
      <div className="row">
        {reviews && reviews.map((review, index) => (
          <div key={index} className="col-sm-4 mb-4">
            <ReviewCard score={review.vote} comment={review.note} />
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
          <Link className="text-white" to={`/restaurantdetail/${restaurantId}/${userId}`}>
            Torna al Ristorante
          </Link>
        </button>
      </div>
    </div>
  );
}
