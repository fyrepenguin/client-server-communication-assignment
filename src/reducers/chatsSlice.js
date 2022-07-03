import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const initialState = { selected: 0, data: [] }


export const fetchChats = createAsyncThunk('tasks/fetchChats', async (_, { getState }) => {
  const state = getState()
  const response = await fetch('http://localhost:3001/chats').then(res => res.json()).then(res => {
    return { ...state.chats, data: res }
  }).catch(err => console.log(err))
  return response
})

export const createChat = createAsyncThunk('tasks/createChat', async (recipients, { getState }) => {
  const state = getState()
  const response = await fetch('http://localhost:3001/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipients: recipients, id: uuid(), messages: [] })
  }).then(res => res.json()).then(res => {
    return { ...state.chats, data: [...state.chats.data, res] }
  }
  ).catch(err => console.error(err))
  return response
})

export const deleteChat = createAsyncThunk('chats/deleteChat', async (id, { getState }) => {
  const state = getState()
  const response = await fetch(`http://localhost:3001/chats/${id}`, { method: 'DELETE' }).then(res => {
    if (!res.ok) {
      // make the promise be rejected if we didn't get a 2xx response
      const err = new Error("Not 2xx response");
      err.response = res;
      throw err;
    } else {
      // got the desired response
      return { ...state.chats, data: state.chats.data.filter(chat => chat.id !== id) }
    }

  }).catch(err => console.error(err))
  return response
});

export const sendMessage = createAsyncThunk('chats/sendMessage', async ({ sender, text, id }, { getState }) => {
  const state = getState();
  const chat = state.chats.data.find(chat => chat.id === id);
  const response = await fetch(`http://localhost:3001/chats/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...chat, messages: [...chat.messages, { sender, text }] })
  }).then(res => res.json()).then(res => {
    console.log({
      ...state.chats, data: [{ ...res }, ...state.chats.data.filter(chat => chat.id !== id)]
    })
    return {
      ...state.chats, data: [{ ...res }, ...state.chats.data.filter(chat => chat.id !== id)]
    }
  }
  ).catch(err => console.error(err))
  return response
})


export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChat: (action) => {
      return action.payload
    },
    selectChat: (state, action) => {
      return { ...state, selected: action.payload }
    },
  },
  extraReducers: {
    [fetchChats.fulfilled]: (state, action) => {
      return action.payload
    },
    [createChat.fulfilled]: (state, action) => {
      return action.payload
    },
    [deleteChat.fulfilled]: (state, action) => {
      return action.payload
    },
    [sendMessage.fulfilled]: (state, action) => {
      return { ...action.payload, selected: 0 }
    }
  }
})

// Action creators are generated for each case reducer function
export const { getChat, selectChat } = chatsSlice.actions

export default chatsSlice.reducer