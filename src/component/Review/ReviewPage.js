import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { useAtom } from 'jotai';
import { currentRestaurant, currentUser } from '../../App';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ vote: '', note: '' });
  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [user, setUser] = useAtom(currentUser);
  const { restaurantId, userId } = useParams();

  useEffect(() => {
    axios.get('/reviews').then((response) => {
      setReviews(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.post(`/reviews/${restaurantId}`, newReview).then((response) => {
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({ vote: '', note: '' });
    });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Reviews</h1>
      <div className="row">
        {reviews.map((review, index) => (
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
            value={newReview.vote}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="note">Comment:</label>
          <textarea
            id="note"
            name="note"
            value={newReview.note}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
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
