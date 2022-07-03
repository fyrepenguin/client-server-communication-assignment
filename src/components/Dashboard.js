import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../reducers/chatsSlice';
import { fetchContacts } from '../reducers/contactsSlice';

export default function Dashboard() {
  const { selected, data } = useSelector(state => state.chats)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.email) {
      dispatch(fetchChats())
      dispatch(fetchContacts())
    }

  }
    , [auth, dispatch])

  return (
    <div className='dashboard'>
      <Sidebar email={auth.email} />
      {data[selected] && <Chat />}
    </div>
  )
}
