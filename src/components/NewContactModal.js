import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createContact } from '../reducers/contactsSlice';

export default function NewContactModal({ closeModal }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    // validation needs to be updated with regex for email/phone number
    if (firstName.length > 0 && email.length > 0) {
      dispatch(createContact({ email, firstName, lastName, phoneNumber }))
      closeModal()
    }
    if (firstName.length === 0) {
      alert('First name is required')
    }
    if (email.length === 0) {
      alert('Email is required')
    }
    return

  }

  return (
    <>
      <button onClick={closeModal} className="modal-close" title="Close Modal">X</button>
      <h3>Create Contact</h3>
      <div className="modal-area">
        <div className='modal-body'>
          <form onSubmit={handleSubmit} className='modal-form'>
            <div className="form-group" >
              <label>First Name</label>
              <input type="text" onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group" >
              <label>Last Name</label>
              <input type="text" onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group" >
              <label>Phone Number</label>
              <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <footer>
              <button className="primary" onClick={handleSubmit}>Create Contact</button>
              <button className="secondary" onClick={closeModal}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
