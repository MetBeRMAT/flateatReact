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
    <div className="container">
      <h1 className="text-center mb-4">Reviews</h1>
      <div className="row">
        {reviews && reviews.map((review, index) => (
          <div key={index} className="col-sm-4 mb-4">
            <ReviewCard score={review.vote} comment={review.note} />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" type="button">
          <Link className="text-white" to={`/restaurant`}>
            Torna al Ristorante
          </Link>
        </button>
      </div>
    </div>
  );
}
