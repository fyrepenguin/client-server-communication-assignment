import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChat, selectChat } from '../reducers/chatsSlice';

export default function ChatList() {

  const chats = useSelector(state => {
    const chats = state?.chats?.data.map((chat, index) => {
      const recipients = chat.recipients.map(recipient => {
        const contact = state.contacts.find(contact => {
          return contact.email === recipient
        })
        const firstName = (contact && contact.firstName) || recipient
        return { email: recipient, firstName }
      })
      const messages = chat.messages.map(message => {
        const contact = state.contacts.find(contact => {
          return contact.email === message.sender
        })
        const firstName = (contact && contact.firstName) || message.sender
        const fromMe = state.auth?.email === message.sender
        return { ...message, senderName: firstName, fromMe }
      })

      const selected = index === state.chats.selected
      return { ...chat, messages, recipients, selected }

    })
    return chats
  })


  const dispatch = useDispatch();

  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className={`chat-item ${chat.selected ? 'active' : ''}`} >
          <div className='avatar-name-container' onClick={() => dispatch(selectChat(index))}>
            <div className='avatar'></div>
            <span>{chat.recipients.map(r => r.firstName).join(', ')}</span>
          </div>

          <div className='chat-item-buttons-container'>
            <button onClick={() => dispatch(deleteChat(index))} className="delete-button" >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
