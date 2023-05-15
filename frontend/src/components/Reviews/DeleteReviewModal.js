import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { fetchSpot } from "../../store/spots";

const DeleteReviewModal = ({ props: { reviewId, spotId, user } }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(reviewId))
      .then(() => dispatch(fetchSpot(spotId)))
      .then(closeModal)
  }
  return (
    <div className='modal-card'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <div className='modal-buttons'>
        <button onClick={handleDelete}>Yes, delete review.</button>
        <button onClick={closeModal}>No, keep review.</button>
      </div>
    </div>
  );
}

export default DeleteReviewModal