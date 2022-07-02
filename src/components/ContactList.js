import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../reducers/contactsSlice';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch();
  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.email} className="contact-item">
          <div className='avatar-name-container'>
            <div className='avatar'></div>
            <span>{contact.firstName}</span>
          </div>

          <div className='contact-item-buttons-container'>
            <button onClick={() => dispatch(deleteContact(contact.email))} className="delete-button" >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
