import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../reducers/chatsSlice';

export default function Chat() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const auth = useSelector(state => state.auth)
  const { selected, data } = useSelector(state => state.chats)

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

  const [selectedChat, setSelectedChat] = useState(chats[selected])

  function handleSubmit(e) {
    e.preventDefault()

    dispatch(sendMessage(
      {
        id: selectedChat.id,
        text,
        sender: auth.email
      }
    ))
    setText('')
  }

  useEffect(() => {
    chats.length > 0 && setSelectedChat(chats[selected])
    setText('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, data])


  return (
    <div className="chat-container">
      <div className='conversation-container'>
        <div>
          {selectedChat.messages.map((message, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className="message-container"
                style={{ alignItems: message.fromMe ? 'end' : 'start', alignSelf: message.fromMe ? 'end' : 'initial', }}
              >
                <div
                  className="message-content"
                  style={{ background: message.fromMe ? '#007bff' : '#dee2e6', color: message.fromMe ? '#fff' : '#6c757d' }}
                >
                  {message.text}
                </div>
                <div className="message-sender"
                  style={{ textAlign: message.fromMe ? 'right' : 'initial' }}>

                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form onSubmit={handleSubmit} className='message-input-container' >
        <div>
          <textarea
            required
            name="message"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button type="submit" className='send-button'>Send</button>

        </div>
      </form>
    </div>
  )
}
