import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from './authSlice';
const initialState = []

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { getState }) => {
  const state = getState()
  const response = await fetch('http://localhost:3001/contacts').then(res => res.json()).then(res => {
    return res
  }).catch(err => console.error(err))
  return [...state.contacts, ...response]
})

export const createContact = createAsyncThunk('contacts/createContact', async (contact, { getState }) => {
  const state = getState()
  const response = await fetch('http://localhost:3001/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  }).then(res => res.json()).then(res => {
    return res
  }
  ).catch(err => console.error(err))
  return [...state.contacts, response]
})

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, { getState }) => {
  const state = getState()
  const response = await fetch(`http://localhost:3001/contacts/${id}`, { method: 'DELETE' }).then(res => {
    if (!res.ok) {
      // make the promise be rejected if we didn't get a 2xx response
      const err = new Error("Not 2xx response");
      err.response = res;
      throw err;
    } else {
      // got the desired response
      return [...state.contacts.filter(contact => contact.id !== id)]
    }

  }).catch(err => console.error(err))
  return response
});

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // createContact: (state, action) => {
    //   return [...state, action.payload]
    // },
    // deleteContact: (state, action) => {
    //   return state.filter(contact => contact.email !== action.payload)
    // },
    updateContact: (state, action) => {
      return state.map(contact => {
        if (contact.email === action.payload.email) {
          return { ...contact, ...action.payload }
        }
        return contact
      }
      )
    },
  },
  extraReducers: {
    [login]: (state, action) => {
      return [{ firstName: 'You', email: action.payload }, ...state]
    },
    [fetchContacts.fulfilled]: (state, action) => {
      return action.payload
    },
    [createContact.fulfilled]: (state, action) => {
      return action.payload
    },
    [deleteContact.fulfilled]: (state, action) => {
      if (action.payload) {
        return action.payload
      }
    }

  }
})

// Action creators are generated for each case reducer function
export const { updateContact } = contactsSlice.actions

export default contactsSlice.reducer