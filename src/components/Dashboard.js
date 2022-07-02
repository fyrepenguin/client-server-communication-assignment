import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { selected, data } = useSelector(state => state.chats)
  const auth = useSelector(state => state.auth)

  return (
    <div className='dashboard'>
      <Sidebar email={auth.email} />
      {data[selected] && <Chat />}
    </div>
  )
}
