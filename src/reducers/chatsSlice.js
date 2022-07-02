import { createSlice } from '@reduxjs/toolkit'
import chatsData from '../data/chats.json'

const initialState = { selected: 0, data: [...chatsData] }

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChat: (action) => {
      return action.payload
    },
    deleteChat: (state, action) => {
      return { ...state, data: state.data.filter((_, i) => i !== action.payload) }
    },
    createChat: (state, action) => {
      const chatAlreadyExists = [...state.data].map(chat => arrayEquality(action.payload, chat.recipients)).includes(true)
      return !chatAlreadyExists ? { ...state, data: [...state.data, { recipients: action.payload, messages: [] }] } : state
    },
    selectChat: (state, action) => {
      return { ...state, selected: action.payload }
    },
    sendMessage: (state, action) => {
      const { recipients, text, sender } = action.payload;
      const getChats = () => {
        let madeChange = false
        const newMessage = { sender, text }
        const newChats = [...state.data].map(chat => {

          if (arrayEquality(chat.recipients, recipients)) {
            madeChange = true
            return {
              ...chat,
              messages: [...chat.messages, newMessage]
            }
          }

          return chat
        })

        if (madeChange) {
          return newChats
        } else {
          return [
            ...state.data,
            { recipients, messages: [newMessage] }
          ]
        }
      }

      return { ...state, data: getChats() }

    },
  },
})

// Action creators are generated for each case reducer function
export const { getChat, createChat, deleteChat, selectChat, sendMessage } = chatsSlice.actions

export default chatsSlice.reducer