import React, { useState, useEffect } from 'react'
import ChatList from './ChatList'
import ContactList from './ContactList'
import NewContactModal from './NewContactModal'
import NewChatModal from './NewChatModal'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice'

const CHATS_KEY = 'chats'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ email }) {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [activeKey, setActiveKey] = useState(CHATS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const chatsOpen = activeKey === CHATS_KEY

  function closeModal() {
    setModalOpen(false)
  }

  useEffect(() => {
    !auth.email && navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <div className='sidebar' >
      <nav className='sidebar-nav'>
        <div className='nav-item'>
          <button onClick={() => setActiveKey(CHATS_KEY)} className={activeKey === CHATS_KEY ? 'active' : ''} >Chats</button>
        </div>
        <div className='nav-item'>
          <button onClick={() => setActiveKey(CONTACTS_KEY)} className={activeKey === CONTACTS_KEY ? 'active' : ''}>Contacts</button>
        </div>
      </nav>
      <div
        className='sidebar-content'>
        {activeKey === CHATS_KEY && <div>
          <ChatList />
        </div>}
        {activeKey === CONTACTS_KEY && <div>
          <ContactList />
        </div>}
      </div>
      <div className="account-info">
        <span>
          Your Email: <span className="account-info__email">{email}</span>
        </span>   <button
          onClick={() => {
            dispatch(logout())
          }}
        >
          logout
        </button>
      </div>
      <button onClick={() => setModalOpen(true)} className="modal-opener">
        New {chatsOpen ? 'Chat' : 'Contact'}
      </button>

      <div className={`modal ${modalOpen ? 'open' : ''}`} id="modal">
        <div className="modal-content">
          {chatsOpen ?
            <NewChatModal closeModal={closeModal} /> :
            <NewContactModal closeModal={closeModal} />
          }
        </div>
      </div>
    </div>
  )
}
