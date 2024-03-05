import React from 'react';

export default function ReviewCard({ score, comment }) {
  return (
    <div className="review-card">
      <p className="review-score">Score: {score}</p>
      <p className="review-comment">Comment: {comment}</p>
    </div>
  );
}
