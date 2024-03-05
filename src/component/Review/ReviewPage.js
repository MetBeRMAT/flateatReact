import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    
    axios.get('/reviews').then((response) => {
      setReviews(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Reviews</h2>
      <div className="row">
        {reviews.map((review, index) => (
          <div key={index} className="col-sm-4">
            <ReviewCard score={review.score} comment={review.comment} />
          </div>
        ))}
      </div>
    </div>
  );
}
