import React from 'react';
import { currentRestaurant, currentUser } from '../../App';
import { atom, useAtom } from 'jotai';

export default function ReviewCard({ score, comment, userName }) 
{

  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [user, setUser] = useAtom(currentUser);

  return (
    <div className="card">
      <div className="card-header">
        <h1 classNameName="review-score">Score: {score}</h1>
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p classNameName="review-comment">{comment}</p>
          {user ?
          <footer className="blockquote-footer">User:  {userName}</footer>
          : <></>}
        </blockquote>
      </div>
    </div>
  );
}
