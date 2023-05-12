import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";


const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(reviewId))
      .then(closeModal)
  }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete}>Yes, delete review.</button>
      <button onClick={closeModal}>No, keep review.</button>
    </div>
  );
}

export default DeleteReviewModal